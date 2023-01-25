import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useColorMode } from '@chakra-ui/color-mode'
import React, { useEffect, useState } from 'react'
import {
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';
import Web3 from 'web3';
import { IconButton } from '@chakra-ui/button'
import { Box, Center, Flex, useColorModeValue, Text, Heading, Button, useToast } from '@chakra-ui/react'
import Navbar from '../components/navbar'

declare let window: any;

const Home: NextPage = () => {

  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%)',
    'linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)')
  const color = useColorModeValue('grey.400', 'whiteAlpha')

  //hooks for connecting to wallet
  const [loading, setLoading] = useState<boolean>(true)
  const [account, setAccount] = useState<null | string[]>(null)

  //hook for toasts
  const toast = useToast();

  const checkIsAuthenticated = async () => {
    if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
      const web3 = new Web3(window.ethereum || window.web3.currentProvider)

      try {
          await window.ethereum.enable()
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts);
          setLoading(false);
      } catch (error) {
          console.error(error)
      }
  } else {
      toast({title: "Wallet Not Found"})
  }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Social Pilot</title>
        <meta name="description" content="social media application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex bgGradient={bg}>
          <Box w='20%' h='100vh'>
            <Text
              as="h1"
              fontSize="4xl"
              fontWeight="bold"
              m={5}
              letterSpacing="tight">
              Social Pilot
            </Text>
          </Box>
          <Center mt={-5} w='60%' h='100vh' >
            <Flex color={color} flexDir="column">
              <Text
                as="h1"
                fontSize="6xl"
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign="center"
              >
                Social Pilot
              </Text>
              <Text
                as="h1"
                fontSize="3xl"
                letterSpacing="tight"
                textAlign="center">
                It is a decentralized social media platform for the privacy lovers
              </Text>
              {account ?
                <Box mt={10} textAlign="center">
                  <Link href={`/dashboard/${account}`}>
                    <Button size='lg' color={color} fontSize="2xl " fontWeight="extrabold" >Go to Dashboard</Button>
                  </Link>
                </Box>
                :
                <Box mt={10} textAlign="center">
                  <Button size='lg' color={color} fontSize="2xl " fontWeight="extrabold" onClick={checkIsAuthenticated}>Connect Wallet</Button>
                </Box>
              }
            </Flex>
          </Center>
          <Box w='17%' h='100vh'>
            <Flex flexDir="row-reverse">
              <IconButton mt={5} aria-label="Toggle Mode" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon color="black" w={5} h={5} /> : <SunIcon color="whiteAlpha.900" w={5} h={5} />}
              </IconButton>
            </Flex>
          </Box>
        </Flex>
      </main>
    </div >
  )
}

export default Home