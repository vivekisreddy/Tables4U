import mysql from 'mysql';

export const handler = async (event) => {
    const { resName, resID } = event;

    if (!resName || !resID) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required fields" }),
        };
    }

    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const findRestaurant = (resName, resID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT restaurantID FROM Restaurants WHERE name = ? AND restaurantID = ?;",
                [resName, resID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); 
                    return resolve(results[0].restaurantID);
                }
            );
        });
    };

    try {
        const restaurant = await findRestaurant(resName, resID);

        if (!restaurant) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Restaurant not found or ID mismatch." }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Successfully logged in." }),
        };
    } catch (error) {
        console.error("Error Logging In", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        pool.end();  // Close the connection pool after the operation
    }
};
