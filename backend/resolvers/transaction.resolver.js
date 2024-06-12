import Transaction from "../models/transaction.model";

const transactionResolvers = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("Unauthorized ")
                }
                const userId = context.getUser()._id
                const transactions = await Transaction.find({ userId })
                return transactions
            } catch (error) {
                throw new Error(error)
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (error) {
                throw new Error(error)

            }
        }
    },
    Mutation: {

        createTransaction: async (_, { input }) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save()
                return newTransaction
            } catch (error) {

            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,
                    input,
                    { new: true }
                )
                return updatedTransaction
            } catch (error) {

            }
        },
        deleteTransaction: async (_, { input }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndUpdate(input.transactionId)
                return deletedTransaction
            } catch (error) {

            }
        },
    }
}
export default transactionResolvers;