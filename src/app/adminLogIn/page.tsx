'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  const handleLogIn = (and) => {
    and.preventDefault()
    // TO DO: admin log in lambda function
    console.log('Admin Email:', email)
    console.log('Admin Password:', password)
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
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <br></br>
        <br></br>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" value={password} onChange={(and) => setPassword(and.target.value)}/>
        <button type="submit" className="adminLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createAdminLogIn" onClick={(e) => createAccount()}>Create Account</button>
    </div>
  )
}