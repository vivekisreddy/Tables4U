'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import axios from 'axios'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [manager, setManager] = React.useState('')
    const [resID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  async function managerLogIn() {
    let payload = {
      "manager": manager,
      "resID": resID
    }

    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/managerLogIn',
        payload,
          {
              headers: {
                  'Content-Type': 'application/json',
              },
              timeout: 5000,  // Timeout in milliseconds (5 seconds)
          }
      );

      if (response.status === 200) {
          setMessage('Manager successfully logged in!');
          console.log(response.data);
          window.location.replace('/managerHomePage')  
      } else {
          throw new Error('Failed to log in');
      }
  } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
      } else if (error instanceof Error) {
          console.error('Error logging in:', error.message);
      } else {
          console.error('Unexpected error:', error);
      }
      setMessage('Error logging in');
  }
};

  function createAccount() {
    window.location.replace("/createRes")
    andRefreshDisplay()
  }

  // below is where the GUI for the manager log in page is drawn
  return (
    <div>
      <label className="managerLogInMessage">{"Manager Log In"}</label>

      <form className="handleLogIn" onSubmit={managerLogIn}>
        <label className="label" htmlFor="name">Restaurant Name:</label>
        <input type="text" style={{ color: 'black' }} id="name" name="name" value={manager} onChange={(and) => setManager(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="pin">Pin Code:</label>
        <input type="text" style={{ color: 'black' }} id="pin" name="pin" value={resID} onChange={(and) => setID(and.target.value)}/>
        <button type="submit" className="managerLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createManagerLogIn" onClick={() => createAccount()}>Create Restaurant</button>
    </div>
  )
}