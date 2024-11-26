'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin home page
    const [redraw, forceRedraw] = React.useState(0)

    const [message, setMessage] = useState('')
    const [resID, setResID] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
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
    // displays account information
    // log out button
    andRefreshDisplay()
  }

  const activateRestaurant = (and) => {
    and.preventDefault();
    handleActivateRestaurant();
    andRefreshDisplay();
  }

  const editRestaurant = (and) => {
    and.preventDefault()
    window.location.replace('/editRes')
    andRefreshDisplay()
  }

  // below is where the GUI for the admin home page is drawn
  return (
    <div>
      <button className="managerAccountButton" onClick={(e) => managerAccount()} >Account Information</button>

      <form className="handleActivateRestaurant" onSubmit={activateRestaurant}>
        <label className="label" htmlFor="resID">Restaurant ID:</label>
        <input type="text" style={{ color: 'black' }} id="resID" name="resID" value={resID} onChange={(and) => setResID(and.target.value)}/>
        <button type="submit" className="activateRestaurantButton">Activate Restaurant</button>
      </form>

      <button className="editRestaurantButton" onClick={(e) => editRestaurant} >Edit Restaurant</button>
    </div>
  )
}