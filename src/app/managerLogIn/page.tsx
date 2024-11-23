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
    // TO DO: manager log in lambda function
    console.log('Manager Name:', name)
    console.log('Restaurant Pin Code:', pin)
    // bring to manager home page
    andRefreshDisplay()
  }

  function createAccount() {
    window.location.replace("/createRes")
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <label className="managerLogInMessage">{"Manager Log In"}</label>

      <form className="handleLogIn" onSubmit={handleLogIn}>
        <label className="label" htmlFor="name">Restaurant Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(and) => setName(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="pin">Pin Code:</label>
        <input type="text" id="pin" name="pin" value={pin} onChange={(and) => setPin(and.target.value)}/>
        <button type="submit" className="managerLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createManagerLogIn" onClick={(e) => createAccount()}>Create Restaurant</button>
    </div>
  )
}