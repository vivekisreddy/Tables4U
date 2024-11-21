'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [name, setName] = useState('')
    const [pin, setPin] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  const handleLogIn = (and) => {
    and.preventDefault()
    //validate log in
    andRefreshDisplay()
  }

  function createAccount() {
    window.location.replace("/managerCreateAccount")
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <form onSubmit={handleLogIn}>
        <label htmlFor="name">Manager Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(and) => setName(and.target.value)}/>
        <label htmlFor="pin">Restaurant Pin Code:</label>
        <input type="text" id="pin" name="pin" value={pin} onChange={(and) => setPin(and.target.value)}/>
        <button className="log in">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="create" onClick={(e) => createAccount()}>Create Account</button>
    </div>
  )
}