// pages/index.tsx
"use client";
import React from "react";
import InfoWidget from "../components/InfoWidget";
import MiniWidget from "../components/MiniWidget";
import dynamic from "next/dynamic";
import ApolloProvider from "@/components/ApolloProvider";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useState } from "react";
import HomePage from "../components/HomePage";

const Home: React.FC = () => {
  return (
    <ApolloProvider>
      <HomePage />
    </ApolloProvider>
  );
};

export default Home;
