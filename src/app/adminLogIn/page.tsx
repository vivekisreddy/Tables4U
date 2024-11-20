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
    and.preventDefault();
    // validate log in
    andRefreshDisplay()
  }

  const createAccount() {
    // bring user to create account page
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <form onSubmit={handleLogIn}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <label htmlFor="password"></label>
        <input type="text" id="password" name="password" value={password} onChange={(and) => setPassword(and.target.value)}/>
        <button className="log in">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="create" onClick={(e) => createAccount()}>Create Account</button>



      <button className="log in" onClick={(e) => andRefreshDisplay()} >Log In</button>

      // figure out how to do textbox
      <label className="email">{"Email:"}</label>
      <label className="password">{"Password:"}</label>

      <label className="message">{"Admin Log In"}</label>
    </div>
  )
}