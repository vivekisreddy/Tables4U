'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

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
        window.location.replace('/adminHomePage')
        // andRefreshDisplay()
      } else {
        alert("Failed to log in")
      }
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.message)
      } else if (error instanceof Error) {
        console.log('Error loggin in:', error.message)
      } else {
        console.log('Unexpected error')
      }
    }
  }

  const handleLogIn = (and) => {
    and.preventDefault()
    if (email == '') {
      alert("Please enter your email address")
    }
    if (password == '') {
      alert("Please enter your password")
    }
    console.log('Admin Email:', email)
    console.log('Admin Password:', password)
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