import mysql from 'mysql';

export const handler = async (event) => {
    const { name } = event;

    // Validation: Ensure a restaurant name is provided
    if (!name) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Restaurant name is required." }),
        };
    }

    // Database connection pool
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Helper function to search for an active restaurant by name
    const searchRestaurantByName = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT name, address, openTime, closeTime 
                 FROM Restaurants 
                 WHERE name = ? AND isActive = 1;`, // Only include active restaurants
                [name],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    try {
        // Search for the restaurant
        const restaurant = await searchRestaurantByName();

        // If no restaurant found, return a 404 error
        if (restaurant.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Active restaurant not found." }),
            };
        }

        // Close the database connection pool
        pool.end();

        // Return success response with restaurant details
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Active restaurant found successfully.",
                restaurant: restaurant[0], // Return the first match
            }),
        };
    } catch (error) {
        console.error("Error searching for restaurant:", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
