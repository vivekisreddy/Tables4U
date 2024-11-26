// 'use client'

// import React, {useState} from 'react';
// import axios from 'axios';
// interface Restaurant {
//   restaurantID: string;
//   name: string;
//   address: string;
//   openTime: number;
//   closeTime: number;
//   isActive: number;
// }

// export default function Home() {
//   // initial instantiation of landing home page
//   const [redraw, forceRedraw] = React.useState(0)

//   const instance = axios.create({
//     baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
//   });

//   const [code, setCode] = useState('');
//   const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
//   const [showActiveOnly, setShowActiveOnly] = useState(false); 
//   const [message, setMessage] = useState('');

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

//   const listRestaurants = async () => {
//     try {
//         const response = await axios.get(
//             'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerListRes',
//             { headers: { 'Content-Type': 'application/json' } }
//         );

//         if (response.status === 200) {
//             let restaurantData = response.data;
//             restaurantData = JSON.parse(restaurantData.body);

//             setRestaurantList(restaurantData);
//             setMessage('Restaurants loaded successfully!');
//         } else {
//             throw new Error('Failed to load restaurants.');
//         }
//     } catch (error) {
//         console.error('Error listing restaurants:', error);
//         setMessage('Error loading restaurants.');
//     }
// };

// // Toggle between showing all or only active restaurants
// const toggleActiveRestaurants = () => {
//     setShowActiveOnly(!showActiveOnly);
//     setMessage(
//         showActiveOnly ? 'Showing all restaurants.' : 'Showing only active restaurants.'
//     );
// };

// // Filter restaurants dynamically based on active status
// const displayedRestaurants = showActiveOnly
//     ? restaurantList.filter((restaurant) => restaurant.isActive === 1)
//     : restaurantList;

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
//       <label className="reservationMessage">{"Make a reservation:"}</label>

//       <label className="confirmMessage">{"Already have a reservation? Find details here!"}</label>

//       <form className="handleConfirm" onSubmit={handleConfirm}>
//         <label className="label" htmlFor="code">Confirmation Code:</label>
//         <input type="text" style={{ color: 'black' }} id="code" name="code" value={code} onChange={(and) => setCode(and.target.value)}/>
//         <button type="submit" className="enter">Enter</button>
//       </form>

//       <div className="consumer-container">
//             <h1 className="title">Consumer Dashboard</h1>

//             <div className="button-container">
//                 <button className="listRestaurantsButton" onClick={listRestaurants}>
//                     List Active Restaurants
//                 </button>
//                 {restaurantList.length > 0 && (
//                     <button className="toggleRestaurantsButton" onClick={toggleActiveRestaurants}>
//                         {showActiveOnly ? 'Show All Restaurants' : 'Show Active Restaurants'}
//                     </button>
//                 )}
//             </div>

//             {/* Display message */}
//             {message && <p className="message">{message}</p>}

//             {/* Display restaurants in tabular form */}
//             {restaurantList.length > 0 ? (
//                 <table className="restaurant-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>Open Time</th>
//                             <th>Close Time</th>
//                             {showActiveOnly && <th>Status</th>}
//                         </tr>
//                     </thead>
//                     <tbody>
//     {displayedRestaurants.map((restaurant, index) => (
//         <tr key={restaurant.restaurantID || index}> 
//             <td>{restaurant.name}</td>
//             <td>{restaurant.address}</td>
//             <td>{restaurant.openTime}</td>
//             <td>{restaurant.closeTime}</td>
//             {showActiveOnly && <td>Active</td>}
//         </tr>
//     ))}
// </tbody>

//                 </table>
//             ) : (
//                 <p>No restaurants available.</p>
//             )}
//             </div>
//     </div>
//   )
// }

'use client'; 

import React, { useState } from "react";
import axios from "axios";

const EditRestaurant = () => {
    const [restaurantID, setRestaurantID] = useState('');
    const [resName, setResName] = useState('');
    const [resAddress, setResAddress] = useState('');
    const [resOpenTime, setResOpenTime] = useState(0);
    const [resCloseTime, setResCloseTime] = useState(0);
    const [resClosedDays, setResClosedDays] = useState<string[]>([]);  // For closed days
    const [resNumTables, setResNumTables] = useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = useState<number[]>([]);
    const [message, setMessage] = useState('');

    const handleAddSeats = (index: number, value: number) => {
        const updatedSeats = [...resSeatsPerTable];
        updatedSeats[index] = value;
        setResSeatsPerTable(updatedSeats);
    };

    const handleEditRestaurant = async () => {
        if (!restaurantID) {
            setMessage('Please provide a valid Restaurant ID to edit.');
            return;
        }

        const updatedData = {
            restaurantID,
            name: resName,
            address: resAddress,
            openTime: resOpenTime,
            closeTime: resCloseTime,
            closedDays: resClosedDays,
            tables: resNumTables,
            seats: resSeatsPerTable,
        };

        try {
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/editRes', 
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000, // Timeout in milliseconds (5 seconds)
                }
            );

            if (response.status === 200) {
                const responseBody = JSON.parse(response.data.body);
                const { message } = responseBody;

                if (message) {
                    setMessage(`Restaurant updated successfully: ${message}`);
                    console.log(`Success: ${message}`);
                } else {
                    setMessage('Unexpected response format.');
                    console.error('Unexpected Response Format:', responseBody);
                }
            } else {
                throw new Error('Failed to edit restaurant.');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else if (error instanceof Error) {
                console.error('Error editing restaurant:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            setMessage('Error editing restaurant.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Edit Restaurant</h1>
            <label className="label">
                Restaurant ID:
                <input
                    type="text"
                    value={restaurantID}
                    onChange={(e) => setRestaurantID(e.target.value)}
                    className="input"
                />
            </label>
            <label className="label">
                Restaurant Name:
                <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="input"
                />
            </label>
            <label className="label">
                Restaurant Address:
                <input
                    type="text"
                    value={resAddress}
                    onChange={(e) => setResAddress(e.target.value)}
                    className="input"
                />
            </label>
            <label className="label">
                Open Time:
                <input
                    type="number"
                    value={resOpenTime}
                    onChange={(e) => setResOpenTime(Number(e.target.value))}
                    className="input"
                />
            </label>
            <label className="label">
                Close Time:
                <input
                    type="number"
                    value={resCloseTime}
                    onChange={(e) => setResCloseTime(Number(e.target.value))}
                    className="input"
                />
            </label>
            <label className="label">
                Number of Tables:
                <input
                    type="number"
                    value={resNumTables}
                    onChange={(e) => setResNumTables(Number(e.target.value))}
                    className="input"
                />
            </label>

            {[...Array(resNumTables)].map((_, index) => (
                <div key={index}>
                    <label className="label">
                        Seats at Table {index + 1}:
                        <input
                            type="number"
                            value={resSeatsPerTable[index] || 0}
                            onChange={(e) => handleAddSeats(index, Number(e.target.value))}
                            className="input"
                        />
                    </label>
                </div>
            ))}

            <label className="label">
                Closed Days (format: YYYY-MM-DD):
                <input
                    type="text"
                    value={resClosedDays.join(', ')} // Display closed days as comma-separated string
                    onChange={(e) => setResClosedDays(e.target.value.split(',').map(day => day.trim()))}
                    className="input"
                />
            </label>

            <div className="button-container">
                <button onClick={handleEditRestaurant} className="button-editRes">
                    Edit Restaurant
                </button>
            </div>

            {message && <p className="message">{message}</p>} {/* This will display the message */}
        </div>
    );
};

export default EditRestaurant;
