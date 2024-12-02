'use client'; 
import React, { useState } from 'react';
import axios from 'axios';

// Define the type for Restaurant
interface Restaurant {
    restaurantID: string;
    name: string;
    address: string;
    openTime: number;
    closeTime: number;
    isActive: number;
}

export default function AdminHomePage() {
    const [redraw, forceRedraw] = React.useState(0)

    // State variables
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); // Store the list of restaurants
    const [message, setMessage] = useState(''); // For success or error messages
    const [resID, setResID] = useState(''); // For success or error messages

    const instance = axios.create({
        baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
      });

      // helper function that forces React app to redraw whenever this is called.
      function andRefreshDisplay() {
        forceRedraw(redraw + 1)
      }

      function listRestaurants() {
        // Access the REST-based API and in response (on a 200 or 400) process.
        instance.get('/adminList')
        .then(function (response) {
          console.log("raw response:", response)
          let status = response.data.statusCode
          let result = response.data.body
  
          console.log("response status:", status)
  
          if (status == 200) {
              let restaurantData = response.data;

              // Log the raw response body
              console.log("Raw Data from Lambda:", restaurantData);

              // If the data is a string, parse it
              restaurantData = JSON.parse(restaurantData.body);

              console.log("Parsed Restaurant Data:", restaurantData);

              // Update the restaurant list state
              setRestaurantList(restaurantData);
              setMessage('Restaurants loaded successfully!');
          } else {
            console.log("Error listing restaurants:", result)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }

      function deleteRestaurant() {
        if (resID) {
          
          // Access the REST-based API and in response (on a 200 or 400) process.
          instance.post('/adminDeleteRes', {"restaurantID":resID})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
    
            if (status == 200) {
              console.log("Restaurant successfully deleted")
              alert("Successfully deleted restaurant!")
              listRestaurants()
              andRefreshDisplay()
            } else {
              console.log("Error deleting restaurant:", result)
              alert("Error deleting restaurant: " + result)
            }
          })
          .catch(function (error) {
            console.log(error)
            alert("An unexpected error occured")
          })
        }
      }
  
      function adminAccount() {
        // displays account information
        // log out button
        andRefreshDisplay()
      }

      const handleDeleteRestaurant = (and:any) => {
        and.preventDefault()
        deleteRestaurant()
      }

    return (
        <div className="admin-container">
            <h1 className="title">Admin Dashboard</h1>

            <div className="button-container">
                <button className="listRestaurantsButton" onClick={listRestaurants}>
                    List Restaurants
                </button>
            </div>

            {/* Display message */}
            {message && <p className="message">{message}</p>}

            {/* Display each restaurant */}
            {restaurantList.length > 0 ? (
                <div className="restaurant-list">
                    {restaurantList.map((restaurant) => (
                        <div key={restaurant.restaurantID} className="restaurant-item">
                            <p>
                                <strong>ID:</strong> {restaurant.restaurantID}
                            </p>
                            <p>
                                <strong>Name:</strong> {restaurant.name}
                            </p>
                            <p>
                                <strong>Address:</strong> {restaurant.address}
                            </p>
                            <p>
                                <strong>Open Time:</strong> {restaurant.openTime}
                            </p>
                            <p>
                                <strong>Close Time:</strong> {restaurant.closeTime}
                            </p>
                            <p>
                                <strong>Status:</strong> {restaurant.isActive === 1 ? 'Active' : 'Inactive'}
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No restaurants available.</p>
            )}
            <button className="adminAccountButton" onClick={(e) => adminAccount()} >Account Information</button>
            
            <form className="handleDeleteRestaurant" onSubmit={handleDeleteRestaurant}>
                <label className="label" htmlFor="resID">Restaurant ID:</label>
                <input type="text" style={{ color: 'black' }} id="resID" name="resID" value={resID} onChange={(and) => setResID(and.target.value)}/>
                <button type="submit" className="deleteRestaurantButton">Delete Restaurant</button>
            </form>
        </div>
    );
}