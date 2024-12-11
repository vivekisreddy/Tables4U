 import mysql from 'mysql';

export const handler = async (event) => {
    let resID = event.restaurantID;

    // Create a connection pool to interact with the MySQL database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Function to find a restaurant by ID
    const findRestaurant = (resID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Restaurants WHERE restaurantID = ?;",
                [resID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No restaurant found
                    return resolve(results[0]); // Return the restaurant if found
                }
            );
        });
    };

    // Function to delete a restaurant by ID
    const deleteRestaurant = (resID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "DELETE FROM Restaurants WHERE restaurantID = ?;",
                [resID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.affectedRows === 0) return resolve(null); // If no rows were affected
                    return resolve(results[0]); // Return the result if restaurant was deleted
                }
            );
        });
    };

    try {
        // Check if the restaurant exists in the database
        const restaurant = await findRestaurant(resID);

        // If restaurant not found, return an error response
        if (!restaurant) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "Restaurant not found." }),
            };
        } else {
            // Delete the restaurant if it exists
            await deleteRestaurant(resID);

            // Return success response with message
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: "Restaurant deleted!" }), // Custom success message
            };
        }
    } catch (error) {
        // Log the error and return a server error response
        console.error("Error Deleting Restaurant", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        pool.end();  // Close the connection pool after the operation
    }
};
