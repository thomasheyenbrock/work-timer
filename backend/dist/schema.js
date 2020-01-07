"use strict";
exports.__esModule = true;
var nexus_prisma_1 = require("nexus-prisma");
var nexus_1 = require("nexus");
var types = require("./types");
exports.schema = nexus_1.makeSchema({
    types: types,
    plugins: [nexus_prisma_1.nexusPrismaPlugin()],
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    typegenAutoConfig: {
        sources: [
            {
                source: '@prisma/photon',
                alias: 'photon'
            },
            {
                source: require.resolve('./context'),
                alias: 'Context'
            },
        ],
        contextType: 'Context.Context'
    }
});
