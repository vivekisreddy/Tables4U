'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [name, setName] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');


    function andRefreshDisplay() {
      forceRedraw(redraw + 1)
    }

  const managerLogIn =async () => {
    const restaurantInfo = {
      resName: name,
      resID: ID,
    };
    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/managerLogIn',{
          resName: name,
          resID: ID,
        }, {
              headers: {
                  'Content-Type': 'application/json',
              },
              timeout: 5000,  // Timeout in milliseconds (5 seconds)
          }
      );
      if (response.status === 200) {
        console.log("response status:", response.status)
        console.log("Manager successfully logged in")
        // andRefreshDisplay()
      } else {
        throw new Error('Failed to log in')
      }
  } catch (error) {
    console.error('Error logging in:', error);
    setMessage('Error logging in.');
  }
}

const handleLogIn = (and) => {
  and.preventDefault()
  managerLogIn()
  window.location.replace('/managerHomePage')

}

  function createAccount() {
    window.location.replace("/createRes")
    andRefreshDisplay()
  }

  // below is where the GUI for the manager log in page is drawn
  return (
    <div>
      <label className="managerLogInMessage">{"Manager Log In"}</label>

      <form className="handleLogIn" onSubmit={handleLogIn}>
        <label className="label" htmlFor="name">Restaurant Name:</label>
        <input type="text" style={{ color: 'black' }} id="name" name="name" value={name} onChange={(and) => setName(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="ID">Pin Code:</label>
        <input type="text" style={{ color: 'black' }} id="pin" name="pin" value={ID} onChange={(and) => setID(and.target.value)}/>
        <button type="submit" className="managerLogIn">Log In</button>
      </form>

      <label className="account">{"Don't have an account? Create one now!"}</label>
      <button className="createManagerLogIn" onClick={() => createAccount()}>Create Restaurant</button>
    </div>
  )
}