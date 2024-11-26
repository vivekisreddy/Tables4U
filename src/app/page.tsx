//====================================================================================
//     LIST ONLY ACTIVE RESTAURANTS FOR CONSUMER SIDE
// =====================================================================================

// 'use client'; 
// import React, { useState } from 'react';
// import axios from 'axios';

// // Define the type for Restaurant
// interface Restaurant {
//     restaurantID: string;
//     name: string;
//     address: string;
//     openTime: number;
//     closeTime: number;
//     isActive: number;
// }

// export default function AdminHomePage() {
//     // State variables
//     const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
//     const [activeRestaurantList, setActiveRestaurantList] = useState<Restaurant[]>([]); // Store active restaurant list
//     const [message, setMessage] = useState(''); 

//     // Function to list all restaurants from the API
//     const listRestaurants = async () => {
//         try {
//             const response = await axios.get(
//                 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerListRes',
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             if (response.status === 200) {
//                 let restaurantData = response.data;

//                 restaurantData = JSON.parse(restaurantData.body);

//                 setRestaurantList(restaurantData);
//                 setMessage('Restaurants loaded successfully!');
//             } else {
//                 throw new Error('Failed to load restaurants.');
//             }
//         } catch (error) {
//             console.error('Error listing restaurants:', error);
//             setMessage('Error loading restaurants.');
//         }
//     };

//     const listActiveRestaurants = () => {
//         const activeRestaurants = restaurantList.filter(restaurant => restaurant.isActive === 0);
//         setActiveRestaurantList(activeRestaurants);
//         setMessage('Active restaurants loaded successfully!');
//     };

//     return (
//         <div className="admin-container">
//             <h1 className="title">Admin Dashboard</h1>

//             <div className="button-container">
//                 <button className="listRestaurantsButton" onClick={listRestaurants}>
//                     List All Restaurants
//                 </button>
//                 <button className="listActiveRestaurantsButton" onClick={listActiveRestaurants}>
//                     List Active Restaurants
//                 </button>
//             </div>

//             {/* Display message */}
//             {message && <p className="message">{message}</p>}

//             {/* Display all restaurants */}
//             {restaurantList.length > 0 && activeRestaurantList.length === 0 ? (
//                 <div className="restaurant-list">
//                     {restaurantList.map((restaurant) => (
//                         <div key={restaurant.restaurantID} className="restaurant-item">
//                             <p><strong>ID:</strong> {restaurant.restaurantID}</p>
//                             <p><strong>Name:</strong> {restaurant.name}</p>
//                             <p><strong>Address:</strong> {restaurant.address}</p>
//                             <p><strong>Open Time:</strong> {restaurant.openTime}</p>
//                             <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
//                             <p><strong>Status:</strong> {restaurant.isActive === 1 ? 'Inactive' : 'active'}</p>
//                             <hr />
//                         </div>
//                     ))}
//                 </div>
//             ) : null}

//             {/* Display active restaurants */}
//             {activeRestaurantList.length > 0 ? (
//                 <div className="restaurant-list">
//                     {activeRestaurantList.map((restaurant) => (
//                         <div key={restaurant.restaurantID} className="restaurant-item">
//                             <p><strong>ID:</strong> {restaurant.restaurantID}</p>
//                             <p><strong>Name:</strong> {restaurant.name}</p>
//                             <p><strong>Address:</strong> {restaurant.address}</p>
//                             <p><strong>Open Time:</strong> {restaurant.openTime}</p>
//                             <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
//                             <p><strong>Status:</strong> Active</p>
//                             <hr />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No more active restaurants available.</p>
//             )}
//         </div>
//     );
// }



//==================================================================
// LIST ALL OF RESTAURANTS FOR ADMIN SIDE
//==================================================================



// 'use client'; 
// import React, { useState } from 'react';
// import axios from 'axios';

// // Define the type for Restaurant
// interface Restaurant {
//     restaurantID: string;
//     name: string;
//     address: string;
//     openTime: number;
//     closeTime: number;
//     isActive: number;
// }

// export default function AdminHomePage() {
//     // State variables
//     const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); // Store the list of restaurants
//     const [message, setMessage] = useState(''); // For success or error messages

//     // Function to list restaurants from the API
//     const listRestaurants = async () => {
//         try {
//             const response = await axios.get(
//                 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/adminList',
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             console.log("Raw Response:", response);  // Check the whole response

//             if (response.status === 200) {
//                 let restaurantData = response.data;

//                 // Log the raw response body
//                 console.log("Raw Data from Lambda:", restaurantData);

//                 // If the data is a string, parse it
//                 restaurantData = JSON.parse(restaurantData.body);

//                 console.log("Parsed Restaurant Data:", restaurantData);

//                 // Update the restaurant list state
//                 setRestaurantList(restaurantData);
//                 setMessage('Restaurants loaded successfully!');
//             } else {
//                 throw new Error('Failed to load restaurants.');
//             }
//         } catch (error) {
//             console.error('Error listing restaurants:', error);
//             setMessage('Error loading restaurants.');
//         }
//     };

//     return (
//         <div className="admin-container">
//             <h1 className="title">Admin Dashboard</h1>

//             <div className="button-container">
//                 <button className="listRestaurantsButton" onClick={listRestaurants}>
//                     List Restaurants
//                 </button>
//             </div>

//             {/* Display message */}
//             {message && <p className="message">{message}</p>}

//             {/* Display each restaurant */}
//             {restaurantList.length > 0 ? (
//                 <div className="restaurant-list">
//                     {restaurantList.map((restaurant) => (
//                         <div key={restaurant.restaurantID} className="restaurant-item">
//                             <p>
//                                 <strong>ID:</strong> {restaurant.restaurantID}
//                             </p>
//                             <p>
//                                 <strong>Name:</strong> {restaurant.name}
//                             </p>
//                             <p>
//                                 <strong>Address:</strong> {restaurant.address}
//                             </p>
//                             <p>
//                                 <strong>Open Time:</strong> {restaurant.openTime}
//                             </p>
//                             <p>
//                                 <strong>Close Time:</strong> {restaurant.closeTime}
//                             </p>
//                             <p>
//                                 <strong>Status:</strong> {restaurant.isActive === 1 ? 'Active' : 'Inactive'}
//                             </p>
//                             <hr />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No restaurants available.</p>
//             )}
//         </div>
//     );
// }



// ==============================================================================================
// --------------------------------------------------------------------------------------------
// THIS IS THE ACTIVATE RESTAURANT
// --------------------------------------------------------------------------------------------

// 'use client'; // Add this at the top of your component file

// import React, { useState } from "react";
// import axios from "axios";

// export default function ActivateRestaurantPage() {
//     const [restaurantID, setRestaurantID] = useState<string>('');
//     const [message, setMessage] = useState<string>('');

//     // Function to activate the restaurant
//     const handleActivateRestaurant = async () => {
//         // if (!restaurantID) {
//         //     setMessage('Please provide a restaurant ID!');
//         //     return;
//         // }

//         try {
//             const activationData = { restaurantID };  
//             const response = await axios.post(
//                 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/activateRes',  // Adjust the URL if needed
//                 activationData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 setMessage(`Restaurant activated successfully!`);
//                 console.log(response.data);
//             } else {
//                 const errorMessage = response.data.error || 'Failed to activate restaurant';
//                 setMessage(errorMessage);
//             }
//         } catch (error) {
//             console.error('Error activating restaurant:', error);
//             setMessage('Error activating restaurant');
//         }
//     };

//     return (
//         <div className="container">
//             <h1 className="title">Activate Restaurant</h1>

//             {/* Input for restaurantID */}
//             <div className="input-container">
//                 <label htmlFor="restaurantID">Enter Restaurant ID:</label>
//                 <input
//                     type="text"
//                     id="restaurantID"
//                     value={restaurantID}
//                     onChange={(e) => setRestaurantID(e.target.value)}
//                     placeholder="Enter Restaurant ID"
//                 />
//             </div>

//             <div className="button-container">
//                 <button onClick={handleActivateRestaurant} className="button-activateRes">
//                     Activate Restaurant
//                 </button>
//             </div>

//             {message && <p className="message">{message}</p>} {/* Display the message */}
//         </div>
//     );
// }



// //--------------------------------------------------------------------------------------------
// // THIS IS THE ACTUAL PAGE.TSX
// //--------------------------------------------------------------------------------------------
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
