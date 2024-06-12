import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolvers from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolvers])

export default mergedResolvers