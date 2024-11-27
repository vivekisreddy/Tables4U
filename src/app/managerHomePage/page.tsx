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
    const [restaurant, setRestaurant] = useState([]); // State to store the array


    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
    }

    let restaurantInfo: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined = [];
    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function viewDetails() {
      instance.post('/viewResDetails', {"name": resName, "address": resAddress, "openTime":resOpenTime, "closeTime":resCloseTime, "tables":resNumTables, "seats":resSeatsPerTable,})
      .then(function (response) {
        console.log("raw response:", response)
        let status = response.data.statusCode
        let result = response.data
        setRestaurant(response.data); // Set the array directly in state
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
        <h1>{restaurant[0]}</h1> {/* Restaurant Name */}
        <p>Address: {restaurant[1]}</p>
        <p>Open Time: {restaurant[2]}</p>
        <p>Close Time: {restaurant[3]}</p>
        <p>Status: {restaurant[5] ? "Active" : "Inactive"}</p>
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
