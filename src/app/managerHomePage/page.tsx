'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; 
import axios from "axios";

export default function ActivateRestaurantPage() {
    const [restaurantID, setRestaurantID] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [resID, setResID] = useState(''); 
    const [resName, setResName] = useState(''); 

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    const router = useRouter(); 

    // Function to activate the restaurant
    const handleActivateRestaurant = async () => {
        // if (!restaurantID) {
        //     setMessage('Please provide a restaurant ID!');
        //     return;
        // }

        try {
            const activationData = { restaurantID };  
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

    function deleteRestaurant() {
      if (resID && resName) {
        
        instance.post('/managerDeleteRes', {"restaurantID":resID, "name":resName})
        .then(function (response) {
          console.log("raw response:", response)
          let status = response.data.statusCode
          let result = response.data.body
  
          console.log("response status:", status)
  
          if (status == 200) {
            console.log("response status:", status)
            console.log("Restaurant successfully deleted")
            router.push('/managerLogIn')
          } else {
            console.log("Error deleting restaurant:", result)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }

    function managerAccount() {
      // displays account information
      // log out button
    }
  
  function editRestaurant() {
      router.push('/editRes')
    }

  function viewAvailability() {
    router.push('/managerViewDay')
  }

    const handleDeleteRestaurant = (and:any) => {
      and.preventDefault()
      if (resID == '') {
        alert("Please input the restaurant ID")
      }
      if (resName == '') {
        alert("Please input the restaurant name")
      }
      deleteRestaurant()
    }

    return (
      <div className="manager-login-container">
        <h1 className="page-title">Manager Home Page</h1>

        <div className="button-container">
          <button className="button-info" onClick={() => editRestaurant()}>
            Edit Restaurant Here
          </button>
          <button className="button-info" onClick={() => viewAvailability()}>
            View Day Availability
          </button>
        </div>
    
        {/* Activate Restaurant Section */}
        <h2>Activate Your Restaurant</h2>
        <div className="button-container">
          <div className="input-container">
            <label htmlFor="restaurantID">Enter Restaurant ID:</label>
            <input
              type="text"
              id="restaurantID"
              value={restaurantID}
              onChange={(e) => setRestaurantID(e.target.value)}
              placeholder="Enter Restaurant ID"
            />
          </div>
        </div>
        <button onClick={handleActivateRestaurant} className="button-info">
          Activate Restaurant
        </button>
    
        {/* Delete Restaurant Section */}
        <h2>Delete Restaurant</h2>
        <div className="button-container">
          <div className="input-container">
            <label htmlFor="resName">Restaurant Name:</label>
            <input
              type="text"
              id="resName"
              name="resName"
              value={resName}
              onChange={(e) => setResName(e.target.value)}
            />
          </div>
          </div>
          <div className="button-container">
          <div className="input-container">
            <label htmlFor="resID">Restaurant ID:</label>
            <input
              type="text"
              id="resID"
              name="resID"
              value={resID}
              onChange={(e) => setResID(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleDeleteRestaurant} className="button-info">
          Delete Restaurant
        </button>

        {message && <p className="message">{message}</p>}

      </div>
    );    
}