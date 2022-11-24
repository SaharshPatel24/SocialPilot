import type { NextPage } from 'next'
import Navbar from '../../components/navbar'
import { useRouter } from 'next/router'

const Dashboard: NextPage = () => {
    const router = useRouter();
    return (
        <Navbar></Navbar>
    )
}

export default Dashboard