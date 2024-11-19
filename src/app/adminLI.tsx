'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import {Admin} from '../admin';

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
      // how do i input something into a function that was typed in by the user?
      <button className="admin log in" onClick={(e) => Admin.logIn(email, password)} >Log In</button>

      // figure out how to do textbox
      <label className="email">{"Email:"}</label>
      <label className="password">{"Password:"}</label>

      <label className="message">{"Admin Log In"}</label>
    </div>
  )
}