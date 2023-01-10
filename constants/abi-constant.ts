export const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "note",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "imageHash",
          "type": "string"
        }
      ],
      "name": "NewPost",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getAllPosts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "note",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageHash",
              "type": "string"
            }
          ],
          "internalType": "struct SocialPilot.Post[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_note",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "newPost",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
