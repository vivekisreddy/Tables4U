'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')

    const instance = axios.create({
      baseURL: 'https://ufk3b674ga.execute-api.us-east-1.amazonaws.com/initial/'
    });
    

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function adminLogIn() {
    // potentially modify the model
    if (email && password) {
      
      // Access the REST-based API and in response (on a 200 or 400) process.
      instance.post('/adminLogIn', {"adminID":email, "password":password})
      .then(function (response) {
        let status = response.data.statusCode
        let result = response.data.body

        if (status == 200) {
          console.log("response status:", status)
          console.log("Admin successfully logged in")
          //window.location.replace('/adminHomePage')
          //andRefreshDisplay()

        } else {
          console.log("Error logging in:", result)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

/*
  const adminLogIn = async () => {
    const payload = {
      adminID: email,
      password: password,
    };
  
    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/adminLogIn',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,  // Timeout in milliseconds (5 seconds)
        }
      );
  
      console.log("Raw Response:", response);
  
      if (response.status === 200) {
        console.log("response status:", response.status)
        console.log("Admin successfully logged in")
        //window.location.replace('/adminHomePage')
        //andRefreshDisplay()
      } else {
        alert("Failed to log in")
      }
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.message)
      } else if (error instanceof Error) {
        console.log('Error logging in:', error.message)
      } else {
        console.log('Unexpected error')
      }
    }
  }
    */

  const handleLogIn = (and) => {
    and.preventDefault()
    adminLogIn()
  }

  function createAccount() {
    window.location.replace("/adminCreateAccount")
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <label className="adminLogInMessage">{"Admin Log In"}</label>

      <form className="handleLogIn" onSubmit={handleLogIn}>
        <label className="label" htmlFor="email">Email:</label>
        <input type="text" style={{ color: 'black' }} id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="password">Password:</label>
        <input type="text" style={{ color: 'black' }} id="password" name="password" value={password} onChange={(and) => setPassword(and.target.value)}/>
        <button type="submit" className="adminLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createAdminLogIn" onClick={(e) => createAccount()}>Create Account</button>
    </div>
  )
}