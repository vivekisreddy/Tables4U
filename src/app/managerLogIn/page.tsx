'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import {managerLogIn} from '../../rLoginController'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [manager, setManager] = React.useState('')
    const [resID, setID] = React.useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function managerLogIn(manager:String, resID:String) {
    let payload = {
      "manager": manager,
      "resID": resID
    }
    fetch("https://thvplief2n4e6qwpg6nl5x7fti0mdklc.lambda-url.us-east-1.on.aws/", {
      method: "GET",
      body: JSON.stringify(payload)
    })
  }

  const handleLogIn = (and) => {
    and.preventDefault()
    if (manager == '') {
      alert("Please enter your name")
    }
    if (resID == '') {
      alert("Please enter your restaurant's ID")
    }
    console.log('Manager Name:', manager)
    console.log('Restaurant ID:', resID)
    managerLogIn(manager, resID)
  }

  function createAccount() {
    window.location.replace("/managerCreateAccount")
    andRefreshDisplay()
  }


  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <label className="managerLogInMessage">{"Manager Log In"}</label>

      <form className="handleLogIn" onSubmit={handleLogIn}>
        <label className="label" htmlFor="name">Restaurant Name:</label>
        <input type="text" id="name" name="name" value={manager} onChange={(and) => setManager(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="pin">Pin Code:</label>
        <input type="text" id="pin" name="pin" value={resID} onChange={(and) => setID(and.target.value)}/>
        <button type="submit" className="managerLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createManagerLogIn" onClick={() => createAccount()}>Create Restaurant</button>
    </div>
  )
}
