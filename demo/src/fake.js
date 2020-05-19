console.log("Are you signed in? ", sign)
verfiy(token).catch(err => console.log(err))

const verfiy = async(token) => {
  if (token) {
    const signOptions = {
      method: 'POST',
      headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ "id_token": token})
    }

    fetch('/evm-google-kms/verify/', signOptions).then(res => res.json()).then(data => {
      setSign(data.isVerfied)
      console.log(data.isVerfied)
      return
    }).catch(err => console.log(err))

    console.log(token)
  } else {
    console.log('No token')
  }
}