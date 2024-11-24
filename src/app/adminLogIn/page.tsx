'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function adminLogIn(email:String, password:String) {
    let payload = {
      "adminEmail": email,
      "adminPassword": password
    }
    fetch("url", {
      // method: is it a GET because i'm checking to see if the account is in the database or is it a POST because im giving it information 
      body: JSON.stringify(payload)
    })
  }

  const handleLogIn = (and) => {
    and.preventDefault()
    if (email == '') {
      alert("Please enter your email address")
    }
    if (password == '') {
      alert("Please enter you password")
    }
    console.log('Admin Email:', email)
    console.log('Admin Password:', password)
    adminLogIn(email, password)
    // if valid log in
      window.location.replace("/adminHomePage")
    // else
      // alert("incorrect email or password")
    andRefreshDisplay()
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