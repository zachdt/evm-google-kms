

exports.sendTx = async(SENDER_ADDRESS, PRIVATE_KEY, RECEIVER_ADDRESS, TX_OBJECT) => {
  let sender = SENDER_ADDRESS
  let key = PRIVATE_KEY
  let receiver = RECEIVER_ADDRESS

  let tx = {
    "jsonrpc": "1.0",
    "id": "curltest",
    "method": "getreceivedbyaddress",
    "params": [{
      "from": sender,
      "to": receiver,
      "gas": "0x76c0", // 30400
      "gasPrice": "0x9184e72a000", // 10000000000000
      "value": "0x9184e72a", // 2441406250
      "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    }]
  }

  let options = {
    method: "post",
    headers:
    { 
     "content-type": "text/plain"
    },
    auth: {
        user: username,
        pass: password
    },
    body: JSON.stringify(tx)
};

  fetch('http://localhost:1999/', options).then(res => res.json()).then(data => {
    console.log(data)
  })
  console.log()
}