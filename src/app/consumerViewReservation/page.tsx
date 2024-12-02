'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [code, setCode] = useState('');

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function confirmRes() {
    if (code) {
      
      // Access the REST-based API and in response (on a 200 or 400) process.
      instance.post('', {"reservationID":code})
      .then(function (response) {
        console.log("raw response:", response)
        let status = response.data.statusCode
        let result = response.data.body

        console.log("response status:", status)

        if (status == 200) {
          // TO DO: show reservation details
          andRefreshDisplay()
        } else {
          alert("Error confirming reservation: " + result)
        }
      })
      .catch(function (error) {
        console.log(error)
        alert("An unexpected error occured. Please try again.")
      })
    }
  }

  const handleConfirm = (and:any) => {
    and.preventDefault();
    if (code == '') {
      alert("Please enter your reservation's confirmation code.")
    }
    else {
      confirmRes()
    }
    andRefreshDisplay()
  }

  // below is where the GUI for the consumer view reservation page is drawn
  return (
    <div>
      <label className="confirmResMessage">{"Confirm your reservation below:"}</label>

      <form className="handleConfirm" onSubmit={handleConfirm}>
        <label className="label" htmlFor="code">Confirmation Code:</label>
        <input type="text" style={{ color: 'black' }} id="code" name="code" value={code} onChange={(and) => setCode(and.target.value)}/>
        <button type="submit" className="enter">Enter</button>
      </form>
    </div>
  )
}