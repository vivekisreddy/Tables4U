'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import { Restaurant } from '@/restaurant'
import React from 'react'

export default function homePage() {
    // initial instantiation of landing home page
    const [restaurant, setModel] = React.useState(new Restaurant("", "", "", [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [], [], []))]
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function activate(wantActivate:Boolean) {
    if (wantActivate && restaurant.isActive == false) {
        restaurant.isActive = true
    } else if (!wantActivate) {
        restaurant.isActive = false
    }
    andRefreshDisplay()
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      
      <div className = "topInfo">
         <label className="RestaurantName">{"Restaurant Name:"}</label>
         <text className="textField">{"Enter Name Here"}</text>
         <label className="Address">{"Restaurant Address:"}</label>
         <text className="textField">{"Enter Address Here"}</text>
         <div className = "Hours">
                 <label className="openTime">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="closeTime">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
         </div>
         <div className = "TablesAndSeats">
            <div className = "SeatPerTable">
                 <label className="SeatAmount">{"Seat Amount:"}</label>
                 <text className="textField">{"Enter Amount Here"}</text>
                 <label className="Tables with Seats">{"Amount of Tables with Seat Values"}</label>
                 <text className="textField">{"Enter Amount Here"}</text>
            </div>  
         </div>
      </div>
      
      <button className="Activate" onClick={() => activate(true)}>{"Activate Now"}</button>
      <button className="Save Locally" onClick={() => activate(false)}>{"Save Locally"}</button>

    </div>
  )
}