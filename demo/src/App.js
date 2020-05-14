import React, {useState, useEffect} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'

import './App.css'

function App() {
  const [isIn, setIn] = useState(false)

  const respGoogle = (resp) => {
    if (resp.tokenId) {
      setIn(true)
      console.log(resp.tokenId)
    }
    console.log(resp)
  }

  const respLogout = (resp) => {
    setIn(false)
  }

  if (isIn) {
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
