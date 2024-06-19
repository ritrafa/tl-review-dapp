import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";
import Image from "next/image";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <Image
        src="/ss.png"
        alt="Solsquare Bonk"
        width={500}
        height={500}
        quality={100}
      />
      <BasicsView />
    </div>
  );
};

export default Basics;
