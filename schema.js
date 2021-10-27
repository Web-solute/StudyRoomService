import { loadFileSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFileSync(`${__dirname}/**/*.tpyeDefs.js`);

const loadedResolvers = loadFileSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;