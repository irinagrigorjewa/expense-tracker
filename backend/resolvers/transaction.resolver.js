import Transaction from "../models/transaction.model.js";

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
                console.error('Error while getting transactions')

                throw new Error(error)
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (error) {
                console.error('Error while getting transaction')

                throw new Error(error)

            }
        },
        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()) throw new Error('Unauthorized')
            const userId = context.getUser()._id
            const transactions = await Transaction.find({ userId })

            const categoryMap = {}
            transactions.forEach(transaction => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0
                }
                categoryMap[transaction.category] += transaction.amount
            })
            // return [{ category: 'categoryMap', totalAmount: 'amountMap' }]
            return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }))
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save()
                return newTransaction
            } catch (error) {
                console.log(error)
                // console.error("Error creating transaction:", err);
                // throw new Error("Error creating transaction");
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
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction
            } catch (error) {

            }
        },

    },
    Transaction: {
        user: async (parent) => {
            const userId = parent.userId;
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error("Error getting user:", err);
                throw new Error("Error getting user");
            }
        },
    },
}
export default transactionResolvers;