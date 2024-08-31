import { setCounter } from "@/src/app/reducer";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Two() {
  const router = useRouter();
  const counter = useSelector((state) => state.reducer.counter);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <div>Post: {router.query.slug}</div>
      <div>Counter: {counter}</div>
      <button
        onClick={() => {
          dispatch(setCounter(counter + 1));
        }}
      >
        Add Counter
      </button>
    </>
  );
}
