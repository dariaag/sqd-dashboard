import { gql, useMutation, useSubscription } from "@apollo/client";
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

let date = getDate();
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
