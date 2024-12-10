import mysql from 'mysql';

export const handler = async (event) => {
    const { resID } = event;

    if (!resID) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Incorrect Access" }),
        };
    }

    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const findRestaurant = (resID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Restaurants WHERE restaurantID = ?;",
                [resID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); 
                    return resolve(results[0]);
                }
            );
        });
    };

    try {
        const restaurant = await findRestaurant(resID);

        if (!restaurant) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Incorrect Access" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify([restaurant.name, restaurant.address, restaurant.openTime, restaurant.closeTime, restaurant.restaurantID, restaurant.isActive]),
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
