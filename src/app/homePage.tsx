'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function Home() {
    // initial instantiation of landing home page
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      <button className="admin log in" onClick={(e) => /*brings user to admin log in page*/} >Admin Log In</button>
      <button className="manager log in" onClick={(e) => /*brings user to manager log in page*/} >Manager Log In</button>
      <button className="confirm res" onClick={(e) => /*confirms reservation when given a confirmation code*/} >Enter</button>

      // figure out how to do textbox
      <label className="date">{"Date:"}</label>
      <label className="time">{"Start Time:"}</label>
      <label className="confirm">{"Confirmation Code:"}</label>

      <label className="message">{"Already have a reservation? Find details here!"}</label>
    </div>
  )
}