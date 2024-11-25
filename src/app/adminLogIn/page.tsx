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
      "email": email,
      "password": password
    }
    fetch("https://w64trg7ugmy27kwdsypiclfiba0djzgg.lambda-url.us-east-1.on.aws/", {
      method: "GET",
      body: JSON.stringify(payload)
    })
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
    adminLogIn(email, password)
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