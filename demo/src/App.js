import React, {useState, useEffect} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'

import './App.css'

function App() {
  const [In, setIn] = useState()

  useEffect(() => {
    setIn(false)
  })
  
  const respGoogle = (resp) => {
    let token = resp.tokenId
    if (token) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id_token": token})
      }

      fetch('/evm-google-kms/getwallet/', requestOptions).then(res => {
        res = res.json()
      })

      console.log(token)
    }
    console.log(resp)
  }

  const respLogout = (resp) => {
    setIn(false)
  }

  if (In) {
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
  return (
    <div className="App">
      <header className="App-header">
        <p>
          evm-google-kms
        </p>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={respGoogle}
          onFailure={respGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </header>
    </div>
  )
  
}

export default App;
