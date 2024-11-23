'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

import React from "react";
import { RestaurantController } from "../restaurantController";

export default function Home() {
    const controller = new RestaurantController();

    const[redraw, forceRedraw] = React.useState(0)
    const[resName, setResName] = React.useState('')
    const[resAddress, setResAddress] = React.useState('')
    const[resNumTables, setResNumTables] = React.useState(0)
    const[resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const[message, setMessage] = React.useState('');
    const[resOpenTime, setResOpenTime] = React.useState(0);
    const[resCloseTime, setResCloseTime] = React.useState(0);


    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
        forceRedraw(redraw + 1)
    }

  const handleAddSeats = (index: number, value: number) => {
    const updatedSeats = [...resSeatsPerTable];
    updatedSeats[index] = value;
    setResSeatsPerTable(updatedSeats);
};

  const handleCreateRestaurant = () => {
    const result = controller.createRestaurant(resName, resAddress, resOpenTime, resCloseTime, resNumTables, resSeatsPerTable);
    setMessage(result); 
    setResName('');
    setResAddress('');
    setResNumTables(0);
    setResOpenTime(0);
    setResSeatsPerTable([]);
};

const handleEditRestaurant = () => {
    const result = controller.editRestaurant(resName, resAddress, resOpenTime, resCloseTime, resNumTables, resSeatsPerTable)
    setMessage(result);
}

return (
    <div className="container">
        <h1 className="title">Create Restaurant</h1>
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
                onChange={(e) => setResCloseTime(Number(e.target.value))}  // Ensure it's converted to a number
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

        <button onClick={handleCreateRestaurant} className="button-createRes">
            Create Restaurant
        </button>
        <button onClick={handleEditRestaurant} className="button-editRes">
            Edit Restaurant
        </button>
        {message && <p className="message">{message}</p>}
    </div>
);
}
