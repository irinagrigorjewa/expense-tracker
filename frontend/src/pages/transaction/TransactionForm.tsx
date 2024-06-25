import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { useMutation } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../../graphql/mutation/transaction.mutation";
import { Transaction } from "../../types/Transaction";
import "./Transaction.scss";

interface Props {
  type: "create" | "update";
  transaction: Transaction | null;
}
export const TransactionForm = ({ type, transaction }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues:
      {
        description: transaction?.description,
        paymentType: transaction?.paymentType,
        category: transaction?.category,
        amount: transaction?.amount,
        location: transaction?.location,
        date: transaction?.date,
      } || {},
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ["GetAllTransactions", "GetTransactionStatistics"],
  });
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: ["GetAllTransactions", "GetTransactionStatistics"],
  });
  const onSubmit = async (data: any) => {
    if (type === "create") {
      await createTransaction({
        variables: {
          input: {
            ...data,
            amount: Number(data?.amount),
          },
        },
      });
    } else {
      await updateTransaction({
        variables: {
          input: {
            ...data,
            amount: Number(data?.amount),
            transactionId: transaction?._id,
          },
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="transaction-form">
      <div className="row">
        <input
          placeholder="Transaction"
          {...register("description")}
          defaultValue={transaction?.description}
        />
      </div>
      <div className="row">
        <select
          {...register("paymentType")}
          defaultValue={transaction?.paymentType}
        >
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
        <select {...register("category")} defaultValue={transaction?.category}>
          <option value="saving">Saving</option>
          <option value="expense">Expense</option>
          <option value="investment">Investment</option>
        </select>
        <input
          {...register("amount")}
          placeholder="Amount"
          defaultValue={transaction?.amount}
        />
      </div>
      <div className="row">
        <input
          {...register("location")}
          placeholder="Location"
          defaultValue={transaction?.location}
        />
        <input
          type="date"
          {...register("date")}
          lang="en"
          defaultValue={
            transaction
              ? new Date(transaction?.date || "")
                  ?.toISOString()
                  ?.split("T")?.[0]
              : ""
          }
        />
      </div>

      <Button
        type="submit"
        label={type === "create" ? "Add Transaction" : "Update Transaction"}
      />
    </form>
  );
};
