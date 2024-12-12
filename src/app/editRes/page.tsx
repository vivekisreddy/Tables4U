'use client'                                             

import axios from "axios";
import React from "react";
import { useRouter } from 'next/navigation'; 


export default function Home() {
    const [resName, setResName] = React.useState('');
    const [resAddress, setResAddress] = React.useState('');
    const [resNumTables, setResNumTables] = React.useState(Number);
    const [resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const [message, setMessage] = React.useState('');
    const [resOpenTime, setResOpenTime] = React.useState(Number);
    const [resCloseTime, setResCloseTime] = React.useState(Number);
    const [resClosedDays, setResClosedDays] = React.useState<string[]>([]);
    const [resIsActive, setIsActive] = React.useState(Number);
    const [resID, setRestaurantID] = React.useState('');  // Store the restaurantID


    const router = useRouter(); 

    const instance = axios.create({
        baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    const handleAddSeats = (index: number, value: number) => {
        const updatedSeats = [...resSeatsPerTable];
        updatedSeats[index] = value;
        setResSeatsPerTable(updatedSeats);
    };

    function getDetails() {
        instance.post('/viewResDetails', {resID})
        .then(function (response) {
          console.log("raw response:", response)
          let status = response.data.statusCode
          let result = response.data.message
          setRestaurantID(result[4])
          setIsActive(result[5])
        })
      }

    function editRes() {
        getDetails()
        instance.post('/editRes', {"resID" : resID, "name": resName, "address": resAddress, "openTime":resOpenTime, "closeTime":resCloseTime, "tables":resNumTables, "seats":resSeatsPerTable,})
        .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
            if (response.status === 200) {
                setMessage('Restaurant edited successfully!');
                console.log(response.data);
                router.push('/managerHomePage')
            } else {
                console.log("Error editing restaurant:", result)
                setMessage(result)
            }
        })
    }

    const handleEditRes = (and:any) => {
        and.preventDefault()
        editRes()
    }

    return (
        <div className="container">

            <h1 className="page-title">Edit Restaurant</h1>

            <h1 className="admin-title">Edit Restaurant</h1>

            <h1 className="admin-title">Edit Restaurant</h1>
            <label className="label">
                Restaurant ID:
                <input
                    type="text"
                    value={resID}
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

            <button onClick={handleEditRes} className="button-info">
                Confirm Edits
            </button>

            {message && <p className="message">{message}</p>}
        </div>
    );
}