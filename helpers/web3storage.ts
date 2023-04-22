import { Web3Response, Web3Storage } from 'web3.storage'

const makeStorageClient = () => {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE! })
}

const storeFiles = async (fileInput: any) => {
    const client = makeStorageClient();

    const rootCid = await client.put(fileInput, {
        name: Date(),
        maxRetries: 3
    });

    console.log('stored files with cid:', rootCid)
    return rootCid;
}

async function retrieveFiles (cid : string) {
    try {
        const client = makeStorageClient()
        const res = await client.get(cid) as Web3Response
        const files = await res.files();
        const url = URL.createObjectURL(files[0]);
        return url
    } catch (error) {
        console.log(error)
    }
    
}

export {
    storeFiles, 
    retrieveFiles,
}



