import type { NextPage } from 'next'
import Navbar from '../../components/navbar/index'
import { Button, SkeletonText, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { storeFiles, retrieveFiles   } from '../../helpers/web3storage'
import { ethers } from 'ethers'
import { ABI } from '../../constants/abi-constant'

const Dashboard: NextPage = () => {
    const [note, setNote] = useState<string>();
    const [allPost, setAllPost] = useState<any[]>();
    const [fetching, setFetching] = useState<boolean>();

    const toast = useToast();
    
    const getAllPostFromChain = async () => {
        try {
          const { ethereum } = window as any;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            setFetching(true);
            const signer = provider.getSigner();
            const wallOfPostsContract = new ethers.Contract(
              process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
              ABI,
              signer
            );
            const posts = await wallOfPostsContract.getAllPosts();
            let allPosts : any[] = [];
            await Promise.all(posts.map(async (post : any) => {
              allPosts.push(await retrieveFiles(post.imageHash));
            })
            );
            setAllPost(allPosts);
            setFetching(false);
          } else {
            console.log("No wallet found!");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const onCreatePost = async (cid: string) => {
        const { ethereum } = window as any;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, ABI, signer);
            const createPostTxn = await contract.newPost(note, cid);
            await createPostTxn.wait();
            toast({
                title: "Post created!",
            });
        } else {
            toast({ title: "No wallet found",});
        }
      };

    const handleUpload = async () => {
        const fileInput = document.getElementById("input-image");
        const cid = await storeFiles(fileInput, note!);
        await onCreatePost(cid);
    };

    useEffect(() => {
        getAllPostFromChain();
    },[])

    return (
        <>
        <Navbar></Navbar>
        <input type={'file'} id={'input-image'}></input>
        <input type="text" id='input-note' value={note} onChange={(e) => setNote(e.target.value)} ></input>
        <Button onClick={handleUpload}>Submit</Button>
        {
            fetching ?
            <h1>Loading...</h1>
            :
            allPost?.map((post, index) => {
                return <img key={index} src={post} width={300} height={300}></img>
            })
        }
        
        </>
    )
}

export default Dashboard