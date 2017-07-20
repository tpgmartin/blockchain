const crypto = require('crypto')

class Block {

  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.hashBlock()
  }

  hashBlock() {
    const sha = crypto.createHash('sha256')
    sha.update(this.index + this.timestamp + this.data + this.previousHash)
    return sha.digest('hex')
  }

}

// Generate genesis block
function createGenesisBlock() {
  // Manually construct a block with index zero and arbitrary previous hash
  return new Block(0, Date(), 'Genesis Block', '0')
}

// Generate all later blocks in the blockchain
function nextBlock(lastBlock) {
  let index = lastBlock.index + 1
  let timestamp = Date()
  let data = `Hey! I'm block ${index}`
  let hash = lastBlock.hash
  return new Block(index, timestamp, data, hash)
}

// Initialise the blockchain with the genesis block
const blockchain = [createGenesisBlock()]
let previousBlock = blockchain[0]

const numBlocksToAdd = 20

// Add blocks to chain and log
for (let i = 0; i < numBlocksToAdd; i++) {
  let blockToAdd = nextBlock(previousBlock)
  blockchain.push(blockToAdd)
  previousBlock = blockToAdd
  console.log(`Block #${blockToAdd.index} has been added to the blockchain!`)
  console.log(`Hash: ${blockToAdd.hash}\n`)
}