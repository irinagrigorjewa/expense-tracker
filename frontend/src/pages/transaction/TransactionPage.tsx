import { TransactionForm } from "./TransactionForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../../graphql/queries/transaction.query";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import "./Transaction.scss";

export const TransactionPage = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_TRANSACTION, {
    variables: {
      transactionId: id,
    },
  });
  return (
    <div className="transaction-page">
      <Breadcrumbs />
      <h2>Update this transaction</h2>
      <TransactionForm type="update" transaction={data?.transaction} />
    </div>
  );
};
