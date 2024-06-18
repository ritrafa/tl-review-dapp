
import { FC } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import { CreateTipLink} from '../../components/TipLinkNew';
import { CreateTipLinkPro} from '../../components/TipLinkPro';

export const BasicsView: FC = ({ }) => {

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Basics
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <SignMessage />
          <SendTransaction />
          <SendVersionedTransaction />
          <CreateTipLink/>
          <CreateTipLinkPro/>
        </div>
      </div>
    </div>
  );
};
