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

  function adminCreateAccount(email:String, password:String) {
    let payload = {
      "newAdminEmail": email,
      "newAdminPassword": password
    }
    fetch("https://cyzldssv4gks6bdkbrxc7kztsm0avynj.lambda-url.us-east-1.on.aws/", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  }

  const handleCreate = (and) => {
    and.preventDefault()
    if (email == '') {
      alert("Please enter an email address")
    }
    if (password == '') {
      alert("Please create a password")
    }
    console.log('Admine Email:', email)
    console.log('Admin Password:', password)
    adminCreateAccount(email, password)
    window.location.replace("/adminLogIn")
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <label className="adminCreateAccountMessage">{"Create an Admin Account:"}</label>

      <form className="handleCreate" onSubmit={handleCreate}>
        <label className="label" htmlFor="email">Email:</label>
        <input type="text" style={{ color: 'black' }} id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="password">Password:</label>
        <input type="text" style={{ color: 'black' }} id="password" name="password" value={password} onChange={(and) => setPassword(and.target.value)}/>
        <button type="submit" className="createAdminAccount">Create</button>
      </form>
    </div>
  )
}