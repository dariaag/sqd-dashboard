import { gql, useMutation, useSubscription } from "@apollo/client";
import exp from "constants";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  if (month < 10) {
    return `${year}-0${month}-${date}`;
  }
  return `${year}-${month}-${date}`;
}

function getMonth() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (month < 10) {
    return `${year}-0${month}`;
  }
  return `${year}-${month}`;
}
function getYesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const month = yesterday.getMonth() + 1;
  const year = yesterday.getFullYear();
  const date = yesterday.getDate();

  if (month < 10) {
    return `${year}-0${month}-${date}`;
  }
  return `${year}-${month}-${date}`;
}
let date = getDate();
let yesterday = getYesterday();
let month = getMonth();
export const CUMULATIVE = gql`
  subscription {
    cumulativeStats {
      id
      shrimpCount
      totalExchangeAmountIn
      totalExchangeAmountOut
      totalTransfersAmount
      whaleCount
      dolphinCount
      goldfishCount
    }
  }
`;

export const DAILY_EXCHANGE_INS = gql`
    subscription {
      dailyExchangeIns(where: { date_eq: "${date}" }) {
        id
        totalAmount
        date
      }
    }
  `;
export const DAILY_EXCHANGE_OUTS = gql`
    subscription {
        dailyExchangeOuts(where: { date_eq: "${date}" }) {
        id
        totalAmount
        date
        }
    }
    `;

export const MONTHLY_EXCHANGE_INS = gql`
    subscription {
        monthlyExchangeIns(where: { date_eq: "${month}" }) {
        id
        totalAmount
        date
        }
    }
    `;
export const MONTHLY_EXCHANGE_OUTS = gql`
    subscription {
        monthlyExchangeOuts(where: { date_eq: "${month}" }) {
        id
        totalAmount
        date
        }
    }
    `;

export const YESTERDAY_EXCHANGE_DATA_OUT = gql`
  query GetYesterdayDataOut {
    dailyExchangeOuts(where: { date_eq: "${yesterday}" }) {
      totalAmount
    }
  }
`;

export const YESTERDAY_EXCHANGE_DATA_IN = gql`
  query GetYesterdayDataIn {
    dailyExchangeIns(where: { date_eq: "${yesterday}" }) {
      totalAmount
    }
  }
`;
export const ALL_DAILY_EXCHANGE_INS = gql`
  query GetAllDailyExchangeIns {
    dailyExchangeIns {
      date
      totalAmount
    }
  }
`;

export const ALL_DAILY_EXCHANGE_OUTS = gql`
  query GetAllDailyExchangeOuts {
    dailyExchangeOuts {
      date
      totalAmount
    }
  }
`;
export const ALL_DAILY_HOLDER_COUNTS = gql`
  query GetAllDailyHolderCounts {
    dailyHolderCounts {
      id
      date
      total
    }
  }
`;

export const DAILY_HOLDER_COUNT = gql`
  subscription OnDailyHolderCount {
    dailyHolderCounts {
      id
      date
      total
    }
  }
`;
