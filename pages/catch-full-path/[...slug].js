import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function CatchFullPath() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      {router.query.slug?.map((s, i) => (
        <div key={s}>
          Param {i + 1} : {s}
        </div>
      ))}
    </>
  );
}
