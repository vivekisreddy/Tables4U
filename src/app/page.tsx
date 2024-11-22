'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react';

export default function Home() {
  // initial instantiation of landing home page
  const [redraw, forceRedraw] = React.useState(0)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [code, setCode] = useState('')
  
  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function confirmRes(code:String) {
    let payload = {
      "confirmationCode":code,
    }
    // TO DO: confirmRes lambda function
    fetch("url", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  }

  const handleSearch = (and) => {
    and.preventDefault();
    // TO DO: if date is in the past
    if (date == '') {
      alert('please select a date in the future')
    }
    // TO DO: if time is outside general range
    if (time == '') {
      alert('please select a valid start time')
    }
    console.log('Date:', date)
    console.log('Start Time:', time)
    // bring to consumer home page with this date and time
    andRefreshDisplay()
  }

  const handleConfirm = (and) => {
    and.preventDefault();
    console.log("Confirmation Code:", code)
    confirmRes(code)
    andRefreshDisplay()
  }

  // brings admin to the admin log in page
  function adminLogIn() {
    window.location.replace("/adminLogIn")
    andRefreshDisplay()
  }

  // brings manager to the manager log in page
  function managerLogIn() {
    window.location.replace("/managerLogIn")
    andRefreshDisplay()
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      <button className="adminLogInButton" onClick={(e) => adminLogIn()} >Admin Log In</button>
      <button className="managerLogInButton" onClick={(e) => managerLogIn()} >Manager Log In</button>

      <label className="welcomeMessage">{"Welcome to Tables4U!"}</label>
      <label className="reservationMessage">{"Make a reservation below:"}</label>

      <form className="handleSearch" onSubmit={handleSearch}>
        <label className="label" htmlFor="date">Date:</label>
        <input type="text" id="date" name="date" value={date} onChange={(and) => setDate(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="time">Start Time:</label>
        <input type="text" id="time" name="time" value={time} onChange={(and) => setTime(and.target.value)}/>
        <button type="submit" className="search">Search</button>
      </form>

      <label className="confirmMessage">{"Already have a reservation? Find details here!"}</label>

      <form className="handleConfirm" onSubmit={handleConfirm}>
        <label className="label" htmlFor="code">Confirmation Code:</label>
        <input type="text" id="code" name="code" value={code} onChange={(and) => setCode(and.target.value)}/>
        <button type="submit" className="enter">Enter</button>
      </form>
    </div>
  )
}