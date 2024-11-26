'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin home page
    const [redraw, forceRedraw] = React.useState(0)
    const [resName, setResName] = useState('');
    const [resAddress, setResAddress] = useState('');
    const [resNumTables, setResNumTables] = useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = useState<number[]>([]);
    const [resOpenTime, setResOpenTime] = useState(0);
    const [resCloseTime, setResCloseTime] = useState(0);
    const [resClosedDays, setResClosedDays] = useState<string[]>([]);
    const [resID, setRestaurantID] = useState('');  // Store the restaurantID
    const [message, setMessage] = useState('');

    let restaurantInfo : [];

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
    }

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function viewDetails() {
      instance.post('/viewResDetails', {"name": resName, "address": resAddress, "openTime":resOpenTime, "closeTime":resCloseTime, "tables":resNumTables, "seats":resSeatsPerTable,})
      .then(function (response) {
        console.log("raw response:", response)
        let status = response.data.statusCode
        let result = response.data.body
        restaurantInfo = result;
        setResName(result[0])
        setResAddress(result[1])
        setResOpenTime(result[2])
        setResCloseTime(result[3])
      })
    }

  const handleActivateRestaurant = async () => {
    if (!resID) {
        setMessage('Restaurant ID is missing!');
        return;
    }

    try {
        const activationData = { resID };  // Send restaurant ID to activate
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

  function managerAccount() {
    viewDetails()
    // log out button
    andRefreshDisplay()
  }

  const activateRestaurant = (and) => {
    and.preventDefault();
    handleActivateRestaurant();
    andRefreshDisplay();
  }

  function editRestaurant() {
    window.location.replace('/editRes')
    andRefreshDisplay()
  }

  // below is where the GUI for the admin home page is drawn
  return (
    <div>
      <button className="managerAccountButton" onClick={(e) => managerAccount()} >Account Information</button>
      <div className = "container">
        <label className="label" htmlFor="Restaurant Name:">Restaurant Name:</label>
        <label className="label" htmlFor="resName">{resName}</label>
        <label className="label" htmlFor="Restaurant Address">Restaurant Address:</label>
        <label className="label" htmlFor="resAddress">{resAddress}</label>
        <label className="label" htmlFor="Restaurant Open Time">Restaurant Open Time:</label>
        <label className="label" htmlFor="resOpenTime">{resOpenTime}</label>
        <label className="label" htmlFor="Restaurant Close Time">Restaurant Close Time:</label>
        <label className="label" htmlFor="resCloseTime">{resCloseTime}</label>
      </div>
      <form className="handleActivateRestaurant" onSubmit={activateRestaurant}>
        <label className="label" htmlFor="resID">Restaurant ID:</label>
        <input type="text" style={{ color: 'black' }} id="resID" name="resID" value={resID} onChange={(and) => setRestaurantID(and.target.value)}/>
        <button type="submit" className="activateRestaurantButton">Activate Restaurant</button>
      </form>

      <button className="editRestaurantButton" onClick={() => editRestaurant()} >Edit Restaurant</button>
    </div>
  )
}