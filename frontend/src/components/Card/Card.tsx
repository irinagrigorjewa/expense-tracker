import { useNavigate } from "react-router-dom";
import { Transaction } from "../../types/Transaction";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../graphql/mutation/transaction.mutation";
import toast from "react-hot-toast";
import "./Card.scss";

interface Props {
  transaction: Transaction;
}

export const Card = ({ transaction }: Props) => {
  const navigate = useNavigate();
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetAllTransactions", "GetTransactionStatistics"],
  });
  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting transaction");
    }
  };
  return (
    <div className={`card ${transaction.category}`}>
      <div className="card-content">
        <div className="title">
          <h2>{transaction.category}</h2>
          <div>
            <MdEdit
              className="edit-button"
              onClick={() => navigate(`/transaction/${transaction._id}`)}
            />
            <MdDelete className="delete-button" onClick={handleDelete} />
          </div>
        </div>
        <p className="row">Description: {transaction.description}</p>
        <p className="row">Payment Type: {transaction.paymentType}</p>
        <p className="row">Location: {transaction.location}</p>
        <p className="row">Amount: {transaction.amount}</p>
        <p className="row">Date: {new Date(transaction.date).toDateString()}</p>
      </div>
    </div>
  );
};
