'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

import React from "react";


export default function Home() {

    const[redraw, forceRedraw] = React.useState(0)
    const[name, setResName] = React.useState('')
    const[address, setResAddress] = React.useState('')
    const[restaurantID, IDreference] = React.useState('')
    const[tables, setResNumTables] = React.useState(0);
    const[isActive, setIsActive] = React.useState(false)
    const[resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const[openTime, setResOpenTime] = React.useState(0);
    const[closeTime, setResCloseTime] = React.useState(0);



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
    
};

return (
    <div className="container">
        <h1 className="title">Create Restaurant</h1>
        <label className="label">
            Restaurant Name:
            <input
                type="text"
                value={name}
                onChange={(e) => setResName(e.target.value)}
                className="input"
            />
        </label>
        <label className="label">
            Restaurant Address:
            <input
                type="text"
                value={address}
                onChange={(e) => setResAddress(e.target.value)}
                className="input"
            />
        </label>
        <label className="label">
            Open Time:
            <input
                type="number"
                value={openTime}
                onChange={(e) => setResOpenTime(Number(e.target.value))}
                className="input"
            />
        </label>
        <label className="label">
            Close Time:
            <input
                type="number"  
                value={closeTime}
                onChange={(e) => setResCloseTime(Number(e.target.value))}  // Ensure it's converted to a number
                className="input"
            />
        </label>
        <label className="label">
            Number of Tables:
            <input
                type="number"
                value={tables}
                onChange={(e) => setResNumTables(Number(e.target.value))}
                className="input"
            />
        </label>

        {[...Array(tables)].map((_, index) => (
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
    </div>
);
}
