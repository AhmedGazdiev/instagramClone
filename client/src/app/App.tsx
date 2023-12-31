import { Suspense, useEffect } from 'react'
import { Navbar, PageLoader } from '@/widgets'
import { useSelector } from 'react-redux'
import { getAuthToken, getFetchAuthUser } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localstorage'
import { Router } from './provider'
import { Button } from 'antd'

const App = () => {
  const isAuth = !!useSelector(getAuthToken)
  const dispatch = useAppDispatch()

  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)

  useEffect(() => {
    if (token) {
      dispatch(getFetchAuthUser())
    }
  }, [dispatch])

  return (
    <div className="app">
      <Suspense fallback=''>
        {isAuth && <Navbar />}
        <PageLoader/>
        <div className="container">
          <Router/>
        </div>
      </Suspense>
    </div>
  )
}

export default App