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


const editRes = (name:string, address:string, restaurantID:string, isActive:Boolean, openTime:number, closeTime:number, tables:number, seats:number[]) => {
    let payload = {
        "name": name, "address": address, "restaurantID": restaurantID, "isActive":isActive, "openTime":openTime, "closeTime":closeTime, "tables":tables, "seats":seats
      }
      fetch("https://hxb5sgcwlguyaco5uaidn23l3a0nkajp.lambda-url.us-east-1.on.aws/", {
        method: "POST",
        body: JSON.stringify(payload)
      })
}

const handleEditRestaurant = () => {
    if (name == '') {
      alert("Please enter your name")
    }
    if (address == '') {
      alert("Please enter your restaurant's address")
    }
    if (isActive == true) {
        alert("Cannot Edit - Restaurant is already Active")
      }
    if (restaurantID == '') {
    alert("Restaurant cannot be found")
    }
    if (openTime == null) {
    alert("Please enter an opening time")
    }
    if (closeTime == null) {
    alert("Please enter a closing time")
    }
    if (tables == 0) {
        alert("Please enter more tables")
    }
    if (resSeatsPerTable.length == 0) {
        alert("Please enter more table seats")
    }

    console.log('Restaurant Name:', name)
    console.log('Restaurant Address:', address)
    console.log('Restaurant ID:', restaurantID)
    console.log('Restaurant isActive:', isActive)
    console.log('Restaurant openTime:', openTime)
    console.log('Restaurant closeTime:', closeTime)
    console.log('Tables:', tables)
    console.log('Seats Per Table:', resSeatsPerTable)
    editRes(name, address, restaurantID, isActive, openTime, closeTime, tables, resSeatsPerTable)


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
        <button onClick={handleEditRestaurant} className="button-editRes">
            Complete Edits
        </button>
    </div>
);
}
