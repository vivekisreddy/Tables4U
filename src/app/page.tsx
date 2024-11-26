'use client'

import React, {useState} from 'react';
import axios from 'axios';
interface Restaurant {
  restaurantID: string;
  name: string;
  address: string;
  openTime: number;
  closeTime: number;
  isActive: number;
}

export default function Home() {
  // initial instantiation of landing home page
  const [redraw, forceRedraw] = React.useState(0)

  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [time, setTime] = useState('')
  const [code, setCode] = useState('')

  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
  const [activeRestaurantList, setActiveRestaurantList] = useState<Restaurant[]>([]); // Store active restaurant list
  const [message, setMessage] = useState(''); 

  
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

  const listActiveRestaurants = () => {
    const activeRestaurants = restaurantList.filter(restaurant => restaurant.isActive === 0);
    setActiveRestaurantList(activeRestaurants);
    setMessage('Active restaurants loaded successfully!');
};

/*
  const handleSearch = (and) => {
    and.preventDefault();
    //let currentDate = new Date()
    //console.log('Current Date:', currentDate)
    // console.log('Date:', month)
    // console.log('Start Time:', time)
    window.location.replace('/consumerListActiveRes')
    andRefreshDisplay()
  }
    */

  const handleConfirm = (and) => {
    and.preventDefault();
    console.log("Confirmation Code:", code)
    confirmRes(code)
    andRefreshDisplay()
  }

  // const handleSearch = (and) => {
  //   and.preventDefault();
  //   listActiveRestaurants
  //   andRefreshDisplay()
  // }

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
      <label className="reservationMessage">{"Make a reservation:"}</label>


      <label className="confirmMessage">{"Already have a reservation? Find details here!"}</label>

      <form className="handleConfirm" onSubmit={handleConfirm}>
        <label className="label" htmlFor="code">Confirmation Code:</label>
        <input type="text" style={{ color: 'black' }} id="code" name="code" value={code} onChange={(and) => setCode(and.target.value)}/>
        <button type="submit" className="enter">Enter</button>
      </form>

      <div className="active-res">
        <h1 className="title">Restaurants:</h1>
        <div className="button-container">
          <button className="search" onClick={(e) => listActiveRestaurants()}>
            Search
            </button>
        </div>
        
        {/* Display message */}
        {message && <p className="message">{message}</p>}
        
        {/* Display active restaurants */}
        {activeRestaurantList.length > 0 ? (
          <div className="restaurant-list">
            {activeRestaurantList.map((restaurant) => (
              <div key={restaurant.restaurantID} className="restaurant-item">
                <p><strong>ID:</strong> {restaurant.restaurantID}</p>
                <p><strong>Name:</strong> {restaurant.name}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Open Time:</strong> {restaurant.openTime}</p>
                <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
                <p><strong>Status:</strong> Active</p>
                <hr />
              </div>
          ))}
          </div>
          ) : (
          <p>Please press the search button.</p>
          )}
      </div>
    </div>
  )
}

