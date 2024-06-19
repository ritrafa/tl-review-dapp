// pages/api/tiplink.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { TipLink, TipLinkClient } from '@tiplink/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.method, req.body); // Log the request details

  if (req.method === 'POST') {
    const { action } = req.body;

    try {
      if (action === 'createLink') {
        console.log('Action: createLink');
        const tiplink = await TipLink.create();
        console.log('TipLink created:', tiplink);
        res.status(200).json({ link: tiplink.url.toString() });
      } else if (action === 'connectClient') {
        console.log('Action: connectClient');
        const apiKey = process.env.NEXT_PUBLIC_TIPLINK_API_KEY;
        if (!apiKey) {
          throw new Error('API Key is missing');
        }

        const client = await TipLinkClient.init(apiKey);
        console.log('TipLinkClient initialized:', client);
        const campaign = await client.campaigns.create({
          name: "Campaign test",
          description: "longer string description",
          imageUrl: "",
          active: true,
        });
        console.log('Campaign created:', campaign);

        const tp = await TipLink.create();
        const tp2 = await TipLink.create();
        console.log('TipLinks created:', tp, tp2);

        // TODO: Fund your tiplinks here using: tp.keypair

        const tiplinks = [tp, tp2];
        await campaign.addEntries(tiplinks);
        console.log('Entries added to campaign');

        const dispenser = await campaign.dispensers.create({
          useCaptcha: false,
          useFingerprint: true,
          unlimitedClaims: false,
        });
        console.log('Dispenser created:', dispenser);

        res.status(200).json({ link: dispenser.url.toString() });
      } else {
        throw new Error('Unknown action');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
