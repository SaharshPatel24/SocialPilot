import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Box, useToast, chakra, Icon, useColorModeValue, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthProvider';
import Dashboard from './dashboard/account';
import LoginPage from '../components/LoginPage/loginPage';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated ?
    <Dashboard></Dashboard>
    :
    <LoginPage></LoginPage>
  )
}

export default Home