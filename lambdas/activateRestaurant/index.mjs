import mysql from 'mysql';

export const handler = async (event) => {
    // Log the incoming event for debugging
    console.log("Received event:", JSON.stringify(event));

    const { restaurantID } = event;  // Destructure directly from the event object

    // Input validation for restaurantID
    if (!restaurantID) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required field: restaurantID" }),
        };
    }

    // Create a connection pool to the database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Helper function to find the restaurant
    const GetRestaurant = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT isActive, name FROM Restaurants WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null);
                    return resolve(results[0]);
                }
            );
        });
    };

    // Helper function to activate the restaurant
    const ActivateRestaurant = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "UPDATE Restaurants SET isActive = 1 WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                }
            );
        });
    };

    try {
        // Step 1: Check if the restaurant exists and if it's already active
        const restaurant = await GetRestaurant(restaurantID);

        if (!restaurant) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Restaurant not found." }),
            };
        }

        if (restaurant.isActive === 1) {  // Checking if restaurant is already active
            return {
                statusCode: 400,
                body: JSON.stringify({ error: `The restaurant "${restaurant.name}" is already active.` }),
            };
        }

        // Step 2: Activate the restaurant
        await ActivateRestaurant(restaurantID);

        // Close the database connection pool
        pool.end();

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `The restaurant "${restaurant.name}" has been activated and is now visible to consumers.` }),
        };
    } catch (error) {
        console.error("Error activating restaurant:", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
