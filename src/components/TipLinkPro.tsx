import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { TipLink, TipLinkClient } from '@tiplink/api';

export const CreateTipLinkPro: FC = () => {
  const onClick = useCallback(async () => {
    try {
      const createCampaignAndDispenserExample = async () => {
        // Use the proxy URL
        const API_URL_BASE = '/api/proxy/v1';

        // Initialize the TipLinkClient with the proxy URL
        const client = await TipLinkClient.init(process.env.NEXT_PUBLIC_TL_API);

        const campaign = await client.campaigns.create({
          name: "Campaign test",
          description: "longer string description",
          imageUrl: '',
          active: true
        });

        const tp = await TipLink.create();
        const tp2 = await TipLink.create();

        // TODO: Fund your tiplinks here using: tp.keypair

        const tiplinks = [tp, tp2];
        await campaign.addEntries(tiplinks);

        const dispenser = await campaign.dispensers.create({
          useCaptcha: false, // optional: default true
          useFingerprint: true, // optional: default true
          unlimitedClaims: false // optional: default false // WARNING: this is global per campaign and affects all dispensers for that campaign
        });
        return dispenser.url;
      }

      createCampaignAndDispenserExample().then(url => {
        console.log(url.toString());
      });

      notify({ type: 'success', message: `TipLink Creation successful!` });
    } catch (error: any) {
      notify({ type: 'error', message: `TipLink Creation failed!`, description: error?.message });
      console.log('error', `TipLink Creation failed! ${error?.message}`);
    }
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="relative group items-center">
        <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
          onClick={onClick}
        >
          <div className="hidden group-disabled:block">
            Create TipLinkPro Disabled
          </div>
          <span className="block group-disabled:hidden">
            Create TipLinkPro
          </span>
        </button>
      </div>
    </div>
  );
};
