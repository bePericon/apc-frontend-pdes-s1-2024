import Header from '@/components/layout/Header/Header'
import Home from '@/components/layout/Home/Home'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) router.replace('/')
  }, [])

  return (
    <>
      <Header />
      <Home />
    </>
  )
}
