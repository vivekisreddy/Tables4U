'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react';

export default function Home() {
  // initial instantiation of landing home page
  const [redraw, forceRedraw] = React.useState(0)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  
  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
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

  const handleSubmit = (and) => {
    and.preventDefault();
    // bring to new page
    andRefreshDisplay()
  }

  // confirms reservation when given a confirmation code
  function confirmRes(code:number) {
    andRefreshDisplay()
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      <button className="admin log in" onClick={(e) => adminLogIn()} >Admin Log In</button>
      <button className="manager log in" onClick={(e) => managerLogIn()} >Manager Log In</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" name="date" value={date} onChange={(and) => setDate(and.target.value)}/>
        <label htmlFor="time"></label>
        <input type="text" id="time" name="time" value={time} onChange={(and) => setTime(and.target.value)}/>
        <input type="submit"/>
      </form>

      <label className="message">{"Already have a reservation? Find details here!"}</label>
      <label className="confirm">{"Confirmation Code:"}</label>
      <button className="enter" onClick={(e) => confirmRes(code)} >Enter</button>
    </div>
  )
}