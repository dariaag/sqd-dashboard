// pages/index.tsx
"use client";
import React from "react";
import InfoWidget from "./InfoWidget";
import MiniWidget from "./MiniWidget";
import dynamic from "next/dynamic";
import ApolloProvider from "@/components/ApolloProvider";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useState } from "react";
import {
  DAILY_EXCHANGE_INS,
  DAILY_EXCHANGE_OUTS,
  CUMULATIVE,
  MONTHLY_EXCHANGE_INS,
  MONTHLY_EXCHANGE_OUTS,
} from "@/app/lib/subs";
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

const HomePage: React.FC = () => {
  const { data: cumulativeData, loading: cumulativeLoading } =
    useSubscription(CUMULATIVE);
  const { data: dailyExchangeInsData, loading: dailyExchangeInsLoading } =
    useSubscription(DAILY_EXCHANGE_INS);
  const { data: dailyExchangeOutsData, loading: dailyExchangeOutsLoading } =
    useSubscription(DAILY_EXCHANGE_OUTS);
  const { data: monthlyExchangeInsData, loading: monthlyExchangeInsLoading } =
    useSubscription(MONTHLY_EXCHANGE_INS);
  const { data: monthlyExchangeOutsData, loading: monthlyExchangeOutsLoading } =
    useSubscription(MONTHLY_EXCHANGE_OUTS);

  // Mock data in case the subscription has not loaded yet
  console.log(monthlyExchangeInsData);
  const overviewData = cumulativeData
    ? cumulativeData.cumulativeStats[0]
    : {
        shrimpCount: 0,
        totalExchangeAmountIn: 0,
        totalExchangeAmountOut: 0,
        totalTransfersAmount: 0,
        whaleCount: 0,
        dolphinCount: 0,
        goldfishCount: 0,
      };
  const dailyExchangeIns =
    dailyExchangeInsData && dailyExchangeInsData.dailyExchangeIns
      ? dailyExchangeInsData.dailyExchangeIns[0]
      : {
          id: 0,
          totalAmount: 1,
          date: "2021-10-01",
        };
  const dailyExchangeOuts =
    dailyExchangeOutsData && dailyExchangeOutsData.dailyExchangeOuts
      ? dailyExchangeOutsData.dailyExchangeOuts[0]
      : {
          id: 0,
          totalAmount: 1,
          date: "2021-10-01",
        };
  const monthlyExchangeIns =
    monthlyExchangeInsData && monthlyExchangeInsData.monthlyExchangeIns
      ? monthlyExchangeInsData.monthlyExchangeIns[0]
      : {
          id: 0,
          totalAmount: 1,
          date: "2021-10",
        };
  const monthlyExchangeOuts =
    monthlyExchangeOutsData && monthlyExchangeOutsData.monthlyExchangeOuts
      ? monthlyExchangeOutsData.monthlyExchangeOuts[0]
      : {
          id: 0,
          totalAmount: 1,
          date: "2021-10",
        };
  return (
    <ApolloProvider>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>
        <div className="relative z-10 flex justify-center pointer-events-none  items-center p-4 gap-4 bg-opacity-80 min-h-screen">
          <div className="max-w-5xl w-full p-4 rounded-xl space-y-4 bg-white bg-opacity-0 ">
            <h1 className="text-4xl sm:text-6xl md:text-8xl z-[-10] font-pixeboy text-center text-black">
              SQD DASHBOARD
            </h1>
            {/* <p className="text-center text-gray-600">
            This dashboard provides an overview of exchange activities,
            transfers, and holder details.
          </p> */}
            <div className="flex flex-col lg:flex-row justify-center gap-4">
              {/* Vertical stack of MiniWidgets */}
              <div className="space-y-4">
                <MiniWidget title="🦐" data={overviewData.shrimpCount} />
                <MiniWidget title="🐠" data={overviewData.goldfishCount} />
                <MiniWidget title="🐬" data={overviewData.dolphinCount} />
                <MiniWidget title="🐳" data={overviewData.whaleCount} />
              </div>
              {/* 2x2 grid of InfoWidgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoWidget
                  title="Daily"
                  data={{
                    date: dailyExchangeIns.date,
                    in: dailyExchangeIns.totalAmount,
                    out: dailyExchangeOuts.totalAmount,
                  }}
                />
                <InfoWidget
                  title="Monthly"
                  data={{
                    date: monthlyExchangeIns.date,
                    in: monthlyExchangeIns.totalAmount,
                    out: monthlyExchangeOuts.totalAmount,
                  }}
                />

                <InfoWidget
                  title="Exchange"
                  data={{
                    date: dailyExchangeIns.date,
                    in: overviewData.totalExchangeAmountIn,
                    out: overviewData.totalExchangeAmountOut,
                  }}
                />
                <InfoWidget
                  title="Total"
                  data={{
                    date: dailyExchangeIns.date,
                    amount: overviewData.totalTransfersAmount,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default HomePage;
