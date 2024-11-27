'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [name, setName] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function andRefreshDisplay() {
      forceRedraw(redraw + 1)
    }

  function managerLogIn() {
    if (name && ID) {
      instance.post('/managerLogIn', {"resName":name, "resID":ID})
      .then(function (response) {
        console.log("raw response:", response)
        let status = response.data.statusCode
        let result = response.data.body

        console.log("response status:", status)

        if (status == 200) {
          console.log("response status:", status)
          console.log("Manager successfully logged in")
          setMessage("Successfully logging in")
          window.location.replace('/managerHomePage')
          andRefreshDisplay()
        } else {
          setMessage("Incorrect Log In Information")
          console.log("Error logging in:", result)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    } else {
      setMessage("Please complete all fields")
    }
    }

  const handleLogIn = (and:any) => {
    and.preventDefault()
    managerLogIn()
  }

  function createAccount() {
    window.location.replace("/createRes")
    andRefreshDisplay()
  }

  // below is where the GUI for the manager log in page is drawn
  return (
    <div className="container">
      <h1 className="title">Manager Log In</h1>
      <label className="label">
          Restaurant Name:
          <input
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
          />
      </label>
      <label className="label">
          Restaurant ID:
          <input
              type="string"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              className="input"
          />
      </label>
      <div className="button-container">
          <button onClick={handleLogIn} className="button-logIn">
              Log In
          </button>
      </div>

      {message && <p className="message">{message}</p>}

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createManagerLogIn" onClick={() => createAccount()}>Create Restaurant</button>
    </div>
  )
}