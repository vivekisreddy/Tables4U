// 'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

// import axios from "axios";
// import React from "react";

// export default function Home() {

//     const [redraw, forceRedraw] = React.useState(0);
//     const [resName, setResName] = React.useState('');
//     const [resAddress, setResAddress] = React.useState('');
//     const [resNumTables, setResNumTables] = React.useState(Number);
//     const [resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
//     const [message, setMessage] = React.useState('');
//     const [resOpenTime, setResOpenTime] = React.useState(Number);
//     const [resCloseTime, setResCloseTime] = React.useState(Number);
//     const [resClosedDays, setResClosedDays] = React.useState<string[]>([]);
//     const [resIsActive, setIsActive] = React.useState(Number);
//     const [resID, setRestaurantID] = React.useState('');  // Store the restaurantID


//     const instance = axios.create({
//         baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
//     });

//     // helper function that forces React app to redraw whenever this is called.
//     function andRefreshDisplay() {
//         forceRedraw(redraw + 1)
//     }

//     const handleAddSeats = (index: number, value: number) => {
//         const updatedSeats = [...resSeatsPerTable];
//         updatedSeats[index] = value;
//         setResSeatsPerTable(updatedSeats);
//     };

//     function getDetails() {
//         instance.post('/viewResDetails', {resID})
//         .then(function (response) {
//           console.log("raw response:", response)
//           let status = response.data.statusCode
//           let result = response.data.message
//           setRestaurantID(result[4])
//           setIsActive(result[5])
//         })
//       }

//     function editRes() {
//         getDetails()
//         instance.post('/editRes', {"resID" : resID, "name": resName, "address": resAddress, "isActive" : resIsActive, "openTime":resOpenTime, "closeTime":resCloseTime, "tables":resNumTables, "seats":resSeatsPerTable,})
//         .then(function (response) {
//             console.log("raw response:", response)
//             let status = response.data.statusCode
//             let result = response.data.body
    
//             console.log("response status:", status)
//             if (response.status === 200) {
//                 setMessage('Restaurant edited successfully!');
//                 console.log(response.data);
//                 window.location.replace('/managerHomePage')
//                 andRefreshDisplay()
//             } else {
//             console.log("Error logging in:", result)
//             }
//         })
//     }

//     const handleEditRes = (and) => {
//         and.preventDefault()
//         editRes()
//       }

//     return (
//         <div className="container">
//             <h1 className="title">Edit Restaurant</h1>
//             <label className="label">
//                 Restaurant ID:
//                 <input
//                     type="text"
//                     value={resID}
//                     onChange={(e) => setRestaurantID(e.target.value)}
//                     className="input"
//                 />
//             </label>
//             <label className="label">
//                 Restaurant Name:
//                 <input
//                     type="text"
//                     value={resName}
//                     onChange={(e) => setResName(e.target.value)}
//                     className="input"
//                 />
//             </label>
//             <label className="label">
//                 Restaurant Address:
//                 <input
//                     type="text"
//                     value={resAddress}
//                     onChange={(e) => setResAddress(e.target.value)}
//                     className="input"
//                 />
//             </label>
//             <label className="label">
//                 Open Time:
//                 <input
//                     type="number"
//                     value={resOpenTime}
//                     onChange={(e) => setResOpenTime(Number(e.target.value))}
//                     className="input"
//                 />
//             </label>
//             <label className="label">
//                 Close Time:
//                 <input
//                     type="number"
//                     value={resCloseTime}
//                     onChange={(e) => setResCloseTime(Number(e.target.value))}
//                     className="input"
//                 />
//             </label>
//             <label className="label">
//                 Number of Tables:
//                 <input
//                     type="number"
//                     value={resNumTables}
//                     onChange={(e) => setResNumTables(Number(e.target.value))}
//                     className="input"
//                 />
//             </label>

//             {[...Array(resNumTables)].map((_, index) => (
//                 <div key={index}>
//                     <label className="label">
//                         Seats at Table {index + 1}:
//                         <input
//                             type="number"
//                             value={resSeatsPerTable[index] || 0}
//                             onChange={(e) => handleAddSeats(index, Number(e.target.value))}
//                             className="input"
//                         />
//                     </label>
//                 </div>
//             ))}

//             {/* Container for the buttons */}
//             <div className="button-container">
//                 <button onClick={handleEditRes} className="button-editRes">
//                     Confirm Edits
//                 </button>
//             </div>
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
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
