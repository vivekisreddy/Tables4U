'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

import React, { useState } from "react";
import { RestaurantController } from "../restaurantController";

export default function Home() {
    const controller = new RestaurantController();

    const[redraw, forceRedraw] = React.useState(0)
    const[resName, setResName] = useState('')
    const[resAddress, setResAddress] = useState('')
    const[resNumTables, setResNumTables] = useState(0)
    const[resSeatsPerTable, setResSeatsPerTable] = useState<number[]>([]);
    const[message, setMessage] = useState('');

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
    const result = controller.createRestaurant(resName, resAddress, resNumTables, resSeatsPerTable);
    setMessage(result); 
    setResName('');
    setResAddress('');
    setResNumTables(0);
    setResSeatsPerTable([]);
};

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
        {message && <p className="message">{message}</p>}
    </div>
);
}