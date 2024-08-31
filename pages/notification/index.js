import React, { useEffect, useState } from "react";

import Head from "next/head";

import Breadcrumb from "@/src/components/common/breadcrumb";
import Notification from "@/src/components/notification/notification";
const index = () => {
  return (
    <>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb root_page="" root_page_path="" page_name="Notification" />

       <Notification/>
    </>
  );
};

export default index;


