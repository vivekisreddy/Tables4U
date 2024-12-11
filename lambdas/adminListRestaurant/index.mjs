import mysql from 'mysql';

export const handler = async (event) => {
    // Create a connection pool to the database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Helper function to fetch all restaurants (active and inactive)
    const getAllRestaurants = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT restaurantID, name, address, openTime, closeTime, isActive FROM Restaurants;", // Fixed SQL query string
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results); // Return all restaurants
                }
            );
        });
    };

    try {
        // Step 1: Fetch all restaurants
        const restaurants = await getAllRestaurants();

        if (restaurants.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No restaurants found." }), // Added body to match consistent response structure
            };
        }

        // Return success response with all restaurant details
        return {
            statusCode: 200,
            body: JSON.stringify(restaurants),
        };
    } catch (error) {
        console.error("Error retrieving restaurants:", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }), // Added body to match consistent response structure
        };
    } finally {
        // Close the database connection pool
        pool.end();
    }
};
