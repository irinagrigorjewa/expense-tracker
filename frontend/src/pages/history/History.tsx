import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { Card } from "../../components/Card/Card";
import { Transaction } from "../../types/Transaction";
// import { GET_USER_AND_TRANSACTIONS } from "../../graphql/queries/user.query";
import "./History.scss";

export const History = () => {
  const { data, loading } = useQuery(GET_ALL_TRANSACTIONS);
  // const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS);
  // console.log(userAndTransactions)
  if (loading) return <p>Loading...</p>;
  return (
    <div className="history">
      {data?.transactions.map((transaction: Transaction) => (
        <Card transaction={transaction} />
      ))}
    </div>
  );
};
