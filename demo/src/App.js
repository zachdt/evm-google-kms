import React, {useState, useEffect, useContext} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import { Button} from '@material-ui/core'

import './App.css'

const App = () => {
  const [sign, setSign] = useState(false)
  const [token, setToken] = useState()
  const [count, setCount] = useState(0)

  const walletCount = async() => {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json' 
      },
    }
    console.log('Fetching wallet count...')

    fetch('/api/walletcount/', requestOptions).then(res => res.json()).then((data) => {
      console.log('Fetched')
      console.log(data.count)
      setCount(data.count)
      return
    }).catch(err => {throw err})
  }


  useEffect(() => {
    walletCount().catch(err => console.log(err))
  },[count, token])
  

  return (
    <div className="App">
      <p>evm-google-kms</p>          
      <Button variant='outlined' color='secondary' href="http://localhost:8080/login/">
        Sign in w/ Google
      </Button>
      <p>{count}/100 wallets live</p>
    </div>
  )
}

export default App
