'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

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

  const router = useRouter();

    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); // Store the list of restaurants
    const [message, setMessage] = useState(''); // For success or error messages
    const [resID, setResID] = useState(''); // For deleting restaurants
    const [loading, setLoading] = useState<boolean>(false); // For loading state
    const [reservation, setReservation] = useState('');

    const instance = axios.create({
        baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function listRestaurants() {
        setLoading(true); // Set loading to true before making the API request
        // Access the REST-based API and process the response.
        instance.get('/adminList')
        .then(function (response) {
            console.log("raw response:", response);
            let status = response.data.statusCode;
            let result = response.data.body;

            console.log("response status:", status);

            if (status === 200) {
                let restaurantData = response.data;
                // If the data is a string, parse it
                restaurantData = JSON.parse(restaurantData.body);

                // Update the restaurant list state
                setRestaurantList(restaurantData);
                setMessage('Restaurants loaded successfully!');
            } else {
                console.log("Error listing restaurants:", result);
                setMessage('Error loading restaurants.');
            }
        })
        .catch(function (error) {
            console.log(error);
            setMessage('Error loading restaurants.');
        })
        .finally(() => {
            setLoading(false); // Set loading to false after the request completes
        });
    }

    function deleteRestaurant() {
        if (resID) {
            instance.post('/adminDeleteRes', { "restaurantID": resID })
            .then(function (response) {
                console.log("raw response:", response);
                let status = response.data.statusCode;
                let result = response.data.body;

                console.log("response status:", status);

                if (status === 200) {
                    alert("Successfully deleted restaurant!");
                    listRestaurants(); // Reload restaurant list after deletion
                } else {
                    alert("Error deleting restaurant: " + result);
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("An unexpected error occurred");
            });
        }
    }
          
          

      function deleteReservation() {
        if (reservation) {
          
          // Access the REST-based API and in response (on a 200 or 400) process.
          instance.post('/adminDeleteReservation', {"confirmationCode":reservation})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
    
            if (status == 200) {
              console.log("Reservation successfully deleted.")
              alert("Successfully deleted reservation.")
            } else {
              console.log("Error deleting reservation:", result)
              alert("Error deleting reservation: " + result)
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
      }

      const handleDeleteRestaurant = (and:any) => {
        and.preventDefault()
        if (resID == '') {
          alert("Please enter the restaurant ID to delete a restaurant.")
        }
        else {
          deleteRestaurant()
        }
      }

      const handleDeleteReservation = (and:any) => {
        and.preventDefault()
        if (reservation == '') {
          alert("Please enter a reservation code to delete a reservation.")
        }
        else {
          deleteReservation()
        }
      }

      function generateReport() {
        router.push("/generateReport")
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

            {/* Display loading state */}
            {loading && <p>Loading...</p>}

            {/* Display restaurants in a table format */}
            {!loading && restaurantList.length > 0 ? (
                <table className="restaurant-table">
                    <thead>
                        <tr>
                            <th>Restaurant ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Open Time</th>
                            <th>Close Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantList.map((restaurant) => (
                            <tr key={restaurant.restaurantID}>
                                <td>{restaurant.restaurantID}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address}</td>
                                <td>{restaurant.openTime}</td>
                                <td>{restaurant.closeTime}</td>
                                <td>{restaurant.isActive === 1 ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : !loading && restaurantList.length === 0 ? (
                <p>No restaurants available.</p>
            ) : null}

            {/* Delete restaurant form */}
            <button className="adminAccountButton" onClick={(e) => adminAccount()} >Account Information</button>
            <button className="availabilityReportButton" onClick={(e) => generateReport()} >Generate Availability Report</button>
            <form className="handleDeleteRestaurant" onSubmit={handleDeleteRestaurant}>
                <label className="label" htmlFor="resID">Restaurant ID:</label>
                <input type="text" style={{ color: 'black' }} id="resID" name="resID" value={resID} onChange={(event) => setResID(event.target.value)} />
                <button type="submit" className="deleteRestaurantButton">Delete Restaurant</button>
            </form>

            <form className="handleDeleteReservation" onSubmit={handleDeleteReservation}>
                <label className="label" htmlFor="reservation">Reservation Code:</label>
                <input type="text" style={{ color: 'black' }} id="reservation" name="reservation" value={reservation} onChange={(and) => setReservation(and.target.value)}/>
                <button type="submit" className="deleteReservationButton">Delete Reservation</button>
            </form>
        </div>
    );
}
