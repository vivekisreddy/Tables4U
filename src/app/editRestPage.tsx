'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function homePage() {
    // initial instantiation of landing home page
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }


  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      
      <div className = "topInfo">
         <label className="RestaurantName">{"Restaurant Name:"}</label>
         <text className="textField">{"Enter Name Here"}</text>
         <label className="Address">{"Restaurant Address:"}</label>
         <text className="textField">{"Enter Address Here"}</text>
         <div className = "Weekly Hours">
             <label className="date">{"Date:"}</label>
             <text className="textField">{"Enter Date Here"}</text>
         </div>
         <div className = "TablesAndSeats">
             <label className="date">{"Date:"}</label>
             <text className="textField">{"Enter Date Here"}</text>
         </div>
      </div>
      
      <label className="time">{"Start Time:"}</label>
      <text className="textField">{"Enter Time Here"}</text>
      
      <label className="confirm">{"Confirmation Code:"}</label>
      <text className="textField">{"Enter Confirmation Code Here"}</text>

    </div>
  )
}