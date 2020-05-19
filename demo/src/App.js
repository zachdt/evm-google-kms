import React, {useState, useEffect, useContext} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'

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

    fetch('/evm-google-kms/walletcount/', requestOptions).then(res => res.json()).then((data) => {
      console.log('Fetched')
      console.log(data.count)
      setCount(data.count)
      return
    }).catch(err => {throw err})
  }


  useEffect(() => {
    walletCount().catch(err => console.log(err))

  },[count, token])
  
  const respGoogle = (resp) => {
    let temp = resp
    if (temp) {
      const signOptions = {
        method: 'POST',
        headers: { 
          'Accept' : 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ "id_token": temp})
      }

      fetch('/evm-google-kms/signin/', signOptions).then((isVerfied) => {
        setToken(resp)
      }).catch(err => console.log(err))

      console.log(token)
    }

  }

  const respLogout = (resp) => {
    setSign(false)
  }


  if (!sign) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            evm-google-kms
          </p>          
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Login"
              onSuccess={respGoogle()}
              onFailure={respGoogle()}
              responseType="id_token"
              cookiePolicy={'single_host_origin'}
            />
            
            <p>{count}/100 wallets live</p>
          
        </header>
      </div>
    )
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            evm-google-kms
          </p>
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={respLogout()}
            onFailure={respLogout()}
          />
        </header>
      </div>
    )
  }
}

export default App;
