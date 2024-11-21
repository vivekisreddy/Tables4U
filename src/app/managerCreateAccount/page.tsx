'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  const handleCreate = (and) => {
    and.preventDefault()
    // TO DO: manager create account lambda function
    window.location.replace("/managerLogIn")
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <label className="managerCreateAccountMessage">{"Create a Manager Account"}</label>

      <form className="handleCreate" onSubmit={handleCreate}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(and) => setName(and.target.value)}/>
        <br></br>
        <br></br>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <br></br>
        <br></br>
        <label htmlFor="pin">Pin:</label>
        <input type="text" id="pin" name="pin" value={pin} onChange={(and) => setPin(and.target.value)}/>
        <button className="createManagerAccount">Create</button>
      </form>
    </div>
  )
}