'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'

export default function Home() {
    // initial instantiation for admin home page
    const [redraw, forceRedraw] = React.useState(0)

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function adminAccount() {
    // displays account information
    // log out button
    andRefreshDisplay()
  }

  function listRestaurants() {
    // all restaurants in the database appear on the screen
    andRefreshDisplay()
  }

  // below is where the GUI for the admin home page is drawn
  return (
    <div>
      <button className="adminAccountButton" onClick={(e) => adminAccount()} >Account Information</button>
      <button className="listRestaurantsButton" onClick={(e) => listRestaurants()} >List Restaurants</button>
    </div>
  )
}