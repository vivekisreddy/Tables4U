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
         <div className = "Weekly Hours">
            <div className = "DayofWeek">
                 <label className="Sunday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Sunday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Monday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Monday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Tuesday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Tuesday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Wednesday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Wednesday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Thursday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Thursday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Friday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Friday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
            <div className = "DayofWeek">
                 <label className="Saturday">{"Open Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
                 <label className="Saturday">{"Close Time:"}</label>
                 <text className="textField">{"Enter Time Here"}</text>
            </div>
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