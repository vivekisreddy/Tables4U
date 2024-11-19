'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <button className="admin log in" onClick={(e) => /*brings user to admin home page*/} >Log In</button>

      // figure out how to do textbox
      <label className="email">{"Email:"}</label>
      <label className="password">{"Password:"}</label>

      <label className="message">{"Admin Log In"}</label>
    </div>
  )
}