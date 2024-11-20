'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function Home() {
    // initial instantiation of landing home page
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function adminLog() {
    andRefreshDisplay()
  }

  function managerLog() {
    andRefreshDisplay()
  }

  function confirmRes() {
    andRefreshDisplay()
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      <div className = "changePOV">
        <button className="admin log in" onClick={() => adminLog()}>{"Admin Log In"}</button>
        <button className="manager log in" onClick={() => managerLog()}>{"Manager Log In"}</button>
        <button className="confirm res" onClick={() => confirmRes()}>{"Enter<"}</button>
      </div>
      
      <label className="date">{"Date:"}</label>
      <text className="textField">{"Enter Date Here"}</text>
      <label className="time">{"Start Time:"}</label>
      <text className="textField">{"Enter Time Here"}</text>
      <label className="confirm">{"Confirmation Code:"}</label>
      <text className="textField">{"Enter Confirmation Code Here"}</text>

      <label className="message">{"Already have a reservation? Find details here!"}</label>
    </div>
  )
}