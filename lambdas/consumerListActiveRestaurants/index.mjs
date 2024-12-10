import mysql from 'mysql';

export const handler = async (event) => {
    // Create a connection pool to the database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Helper function to fetch only active restaurants
    const getActiveRestaurants = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT name, address, openTime, closeTime FROM Restaurants WHERE isActive = 1;", // Query only active restaurants
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results); // Return active restaurants
                }
            );
        });
    };

    try {
        // Step 1: Fetch all active restaurants
        const activeRestaurants = await getActiveRestaurants();

        if (activeRestaurants.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No active restaurants found." }),
            };
        }

        // Return success response with active restaurant details
        return {
            statusCode: 200,
            body: JSON.stringify(activeRestaurants),
        };
    } catch (error) {
        console.error("Error retrieving active restaurants:", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        // Close the database connection pool
        pool.end();
    }
};
