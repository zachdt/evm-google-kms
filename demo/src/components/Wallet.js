import React, {useState, useEffect, useContext} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import { Button} from '@material-ui/core'
import {BrowserRouter, Redirect} from 'react-router-dom'

const Wallet = () => {
  const [count, setCount] = useState(0)
  const [balance, setBalance] = useState(null)

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

  const accountBalance= async() => {
    const requestOptions2 = {
      method: 'GET',
      headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json' 
      },
    }
    console.log('Fetching account balance...')

    fetch('/api/wallet/', requestOptions2).then(res => res.json()).then((data) => {
      console.log('Fetched wallet...')
      console.log(data.user)
      setBalance(data.user)
      return
    }).catch(err => {throw err})
  }

  useEffect(() => {
    walletCount().catch(err => console.log(err))
    accountBalance().catch(err => console.log(err))
  },[count, balance])
  
  return (
    <div className="App">
    <BrowserRouter>
      <Redirect to='/wallet'/>
      <p>evm-google-kms wallet</p>          
        <p>{count}/100 wallets live</p>
      <p>Account Balance: {balance}</p>
    </BrowserRouter>

    </div>
  )
}

export default Wallet