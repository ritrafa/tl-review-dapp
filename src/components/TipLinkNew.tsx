import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { createLink, connectClient } from '../../lib/tiplinkService';

export const CreateTipLink: FC = () => {
    const handleCreateLink = useCallback(async () => {
        try {
            const tiplink = createLink().then(tiplink => {
                console.log("link: ", tiplink);
                return tiplink;
          });
            notify({ type: 'success', message: `TipLink Creation successful! ${(await tiplink)}`});
        } catch (error: any) {
            notify({ type: 'error', message: `TipLink Creation failed!`, description: error?.message });
            console.log('error', `TipLink Creation failed! ${error?.message}`);
        }
    }, [notify]);
    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={handleCreateLink}
                >
                    <div className="hidden group-disabled:block">
                        Create TipLink Disabled
                    </div>
                    <span className="block group-disabled:hidden" > 
                        Create TipLink
                    </span>
                </button>
            </div>
        </div>
    );
};