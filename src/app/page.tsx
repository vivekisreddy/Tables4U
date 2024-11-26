// 'use client'

// import React, {useState} from 'react';

// export default function Home() {
//   // initial instantiation of landing home page
//   const [redraw, forceRedraw] = React.useState(0)

//   const [month, setMonth] = useState('')
//   const [day, setDay] = useState('')
//   const [year, setYear] = useState('')
//   const [time, setTime] = useState('')
//   const [code, setCode] = useState('')
  
//   // helper function that forces React app to redraw whenever this is called.
//   function andRefreshDisplay() {
//     forceRedraw(redraw + 1)
//   }

//   function confirmRes(code:String) {
//     let payload = {
//       "confirmationCode":code,
//     }
//     // TO DO: confirmRes lambda function
//     fetch("url", {
//       method: "POST",
//       body: JSON.stringify(payload)
//     })
//   }

//   const handleSearch = (and) => {
//     and.preventDefault();
//     let currentDate = new Date()
//     console.log('Current Date:', currentDate)
//     // TO DO: if date is in the past
//     console.log('Date:', month)
//     console.log('Start Time:', time)
//     // bring to consumer home page with this date and time
//     andRefreshDisplay()
//   }

//   const handleConfirm = (and) => {
//     and.preventDefault();
//     console.log("Confirmation Code:", code)
//     confirmRes(code)
//     andRefreshDisplay()
//   }

//   // brings admin to the admin log in page
//   function adminLogIn() {
//     window.location.replace("/adminLogIn")
//     andRefreshDisplay()
//   }

//   // brings manager to the manager log in page
//   function managerLogIn() {
//     window.location.replace("/managerLogIn")
//     andRefreshDisplay()
//   }

//   // below is where the GUI for the landing home page is drawn
//   return (
//     <div>
//       <button className="adminLogInButton" onClick={(e) => adminLogIn()} >Admin Log In</button>
//       <button className="managerLogInButton" onClick={(e) => managerLogIn()} >Manager Log In</button>

//       <label className="welcomeMessage">{"Welcome to Tables4U!"}</label>
//       <label className="reservationMessage">{"Make a reservation below:"}</label>

//       <form className="handleSearch" onSubmit={handleSearch}>
//         <label className="label" htmlFor="month">Month:</label>
//         <input type="text" id="month" name="month" value={month} onChange={(and) => setMonth(and.target.value)}/>
//         <label className="label" htmlFor="day">Day:</label>
//         <input type="text" id="day" name="day" value={day} onChange={(and) => setDay(and.target.value)}/>
//         <label className="label" htmlFor="year">Year:</label>
//         <input type="text" id="year" name="year" value={year} onChange={(and) => setYear(and.target.value)}/>
//         <br></br>
//         <label className="dateFormat">{"Format: MM/DD/YYYY"}</label>
//         <br></br>
//         <br></br>
//         <label className="label" htmlFor="time">Start Time:</label>
//         <input type="text" id="time" name="time" value={time} onChange={(and) => setTime(and.target.value)}/>
//         <button type="submit" className="search">Search</button>
//       </form>

//       <label className="confirmMessage">{"Already have a reservation? Find details here!"}</label>

//       <form className="handleConfirm" onSubmit={handleConfirm}>
//         <label className="label" htmlFor="code">Confirmation Code:</label>
//         <input type="text" id="code" name="code" value={code} onChange={(and) => setCode(and.target.value)}/>
//         <button type="submit" className="enter">Enter</button>
//       </form>
//     </div>
//   )
// }

'use client'; // Add this at the top of your component file

import React, { useState } from "react";
import axios from "axios";

export default function ActivateRestaurantPage() {
    const [restaurantID, setRestaurantID] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    // Function to activate the restaurant
    const handleActivateRestaurant = async () => {
        if (!restaurantID) {
            setMessage('Please provide a restaurant ID!');
            return;
        }

        try {
            const activationData = { restaurantID };  // Send restaurant ID to activate
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/activateRes',  // Adjust the URL if needed
                activationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setMessage(`Restaurant activated successfully!`);
                console.log(response.data);
            } else {
                const errorMessage = response.data.error || 'Failed to activate restaurant';
                setMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error activating restaurant:', error);
            setMessage('Error activating restaurant');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Activate Restaurant</h1>

            {/* Input for restaurantID */}
            <div className="input-container">
                <label htmlFor="restaurantID">Enter Restaurant ID:</label>
                <input
                    type="text"
                    id="restaurantID"
                    value={restaurantID}
                    onChange={(e) => setRestaurantID(e.target.value)}
                    placeholder="Enter Restaurant ID"
                />
            </div>

            <div className="button-container">
                <button onClick={handleActivateRestaurant} className="button-activateRes">
                    Activate Restaurant
                </button>
            </div>

            {message && <p className="message">{message}</p>} {/* Display the message */}
        </div>
    );
}
