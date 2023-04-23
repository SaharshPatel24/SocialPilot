import React, { createContext, useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { retrieveFiles } from '../helpers/web3storage';
import { ABI } from '../constants/abi-constant';

type Posts = {
    image: string | null;
    note: string | null;
    author: string | null; 
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const PostContext = createContext<Posts[]>([]);

const PostProvider = ({ children }: AuthProviderProps) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  let web3: any;

  useEffect(() => {
    (async function(window: any) {
        web3 = new Web3(window.ethereum);
    })(window)

    const fetchPosts = async () => {
      try {
          const socialPilotContract = new web3.eth.Contract(ABI as any, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!);
          const post = await socialPilotContract.methods.getAllPosts().call();
          let allPosts: Posts[] = [];
          await Promise.all(
            post.map(async (post: any) => {
              allPosts.push({ image: await retrieveFiles(post.imageHash), note: post.note, author: post.author });
            })
          );
          setPosts(allPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

    // Fetch posts every 3 minutes
    const interval = setInterval(fetchPosts, 180000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export { PostProvider, usePostContext };
