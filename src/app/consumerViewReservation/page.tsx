'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [code, setCode] = useState('');
    const [code1, setCode1] = useState('');

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
      instance.post('/consumerViewReservation', {"confirmationCode":code})
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

  function deleteRes() {
    if (code1) {
      
      // Access the REST-based API and in response (on a 200 or 400) process.
      instance.post('', {"reservationID":code1})
      .then(function (response) {
        console.log("raw response:", response)
        let status = response.data.statusCode
        let result = response.data.body

        console.log("response status:", status)

        if (status == 200) {
          alert("Successfully deleted reservation.")
          window.location.replace("/page")
          andRefreshDisplay()
        } else {
          alert("Error deleting reservation: " + result)
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

  const handleDelete = (and:any) => {
    and.preventDefault();
    if (code1 == '') {
      alert("Please enter your confirmation code to delete your reservation.")
    }
    else {
      deleteRes()
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

      <label className="deleteResMessage">{"Or delete your reservation here:"}</label>

      <form className="handleDelete" onSubmit={handleDelete}>
        <label className="label" htmlFor="code1">Confirmation Code:</label>
        <input type="text" style={{ color: 'black' }} id="code1" name="code1" value={code1} onChange={(and) => setCode1(and.target.value)}/>
        <button type="submit" className="deleteResButton">Delete</button>
      </form>
    </div>
  )
}