import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { createLink, connectClient } from '../../lib/tiplinkService';

export const CreateTipLinkPro: FC = () => {
    const handleCreateClient = useCallback(async () => {
        try {
            const tiplinkClient = connectClient().then(tiplinkClient => {
                console.log("client: ", tiplinkClient);
                return tiplinkClient;
          });
            notify({ type: 'success', message: `TipLink Client Creation successful! ${(await tiplinkClient)}`});
        } catch (error: any) {
            notify({ type: 'error', message: `TipLink Client Creation failed!`, description: error?.message });
            console.log('error', `TipLink Client Creation failed! ${error?.message}`);
        }
    }, [notify]);
    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={handleCreateClient}
                >
                    <div className="hidden group-disabled:block">
                        Create TipLink Client Disabled
                    </div>
                    <span className="block group-disabled:hidden" > 
                        Create TipLink Client
                    </span>
                </button>
            </div>
        </div>
    );
};