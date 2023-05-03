import Web3 from "web3"
import { ABI } from "../constants/abi-constant";
import { storeFiles } from "../helpers/web3storage";

const createPost = async(image : Record<never,string>, description : string) => {
 try {
    let web3 : any;
    (async function(window: any) {
        if (typeof window.ethereum !== 'undefined') {
          web3 = new Web3(window.ethereum);
        } else {
          return { status: 403, message: "No Wallet Found"}
        }
      })(window)
    const socialPilotContract = new web3.eth.Contract(ABI as any, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
    const cid = await storeFiles(image);
    const createPostTxn = await socialPilotContract.methods.newPost(description, cid).call();
    return { status: 200, messaga : "Post Created"}
 } catch (error) {
    console.log(error);
    return { status: 500, messaga : "Unable to create post"};
 }
    
}

export {
    createPost
}