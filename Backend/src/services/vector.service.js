// Require the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding

const mychatgptprojectIndex = pc.Index('my-aura-ai-project');

// A createMemory fnc do vectors , metadata , messageId ke form mein vectors ko store krke dega

async function createMemory({ vectors, metadata, messageId }) {

  await mychatgptprojectIndex.upsert([{
    id: messageId,
    values: vectors,
    metadata
  }])

}

async function queryMemory({ queryVector, limit = 5, metadata }) {

  const data = await mychatgptprojectIndex.query({
    vector: queryVector,
    topK: limit, // topk means pick 5 closest points
    filter: metadata ? metadata  : undefined,
    includeMetadata: true
  })

  return data.matches

}


module.exports = {
  createMemory,
  queryMemory
}