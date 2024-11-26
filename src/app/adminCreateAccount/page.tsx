'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  const adminCreateAccount = async () => {
    const payload = {
      "adminID": email,
      "password": password,
    };

    setEmail('');
    setPassword('');

    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/adminCreateAccount',
        payload,
        {
          headers: {
              'Content-Type': 'application/json',
          },
          timeout: 5000,  // Timeout in milliseconds (5 seconds)
        }
      );
      if (response.status === 200) {
        console.log("response status:", response.status)
        console.log("Admin account successfully created")
        //window.location.replace('/adminLogIn')
        //andRefreshDisplay()
      } else {
        alert("Failed to create account")
      }
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.message)
      } else if (error instanceof Error) {
        console.log('Error creating account:', error.message)
      } else {
        console.log('Unexpected error')
      }
    }
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
    adminCreateAccount()
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