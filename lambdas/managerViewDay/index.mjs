import mysql from 'mysql';

export const handler = async (event) => {
    const { restaurantID, viewDate } = event;

    if (!restaurantID || !viewDate) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Incomplete information provided." }),
        };
    }

    // Database connection pool
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const getRestaurantDetails = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT openTime, closeTime FROM Restaurants WHERE restaurantID = ? AND isActive = 1;`,
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    const getReservationsForDate = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT tableID, reservationTime, consumerEmail 
                 FROM Reservations 
                 WHERE restaurantID = ? AND reservationDate = ?;`,
                [restaurantID, viewDate],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    const getTables = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT tableID FROM Tables WHERE restaurantID = ?;`,
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    try {
        const restaurantDetails = await getRestaurantDetails();

        if (restaurantDetails.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Restaurant not found or inactive." }),
            };
        }

        const { openTime, closeTime } = restaurantDetails[0];
        const reservations = await getReservationsForDate();
        const tables = await getTables();

        if (tables.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No tables found for the restaurant." }),
            };
        }

        const timeSlots = [];
        for (let hour = openTime; hour < closeTime; hour++) {
            timeSlots.push(hour);
        }

        // Process tables to extract the last digit from tableID
        const processedTables = tables.map((t) => ({
            tableID: t.tableID,
            tables: t.tableID.match(/\d+$/) ? t.tableID.match(/\d+$/)[0] : "?",
        }));

        const availabilityTable = [];
        availabilityTable.push([viewDate, ...processedTables.map((t) => `T${t.tables}`)]);

        for (const hour of timeSlots) {
            const row = [`${hour}:00`];
            for (const table of processedTables) {
                const reservation = reservations.find(
                    (r) => r.tableID === table.tableID && r.reservationTime === hour
                );
                row.push(reservation ? reservation.consumerEmail : "Available");
            }
            availabilityTable.push(row);
        }

        // Close the database connection pool
        pool.end();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Day availability fetched successfully.",
                availabilityTable,
            }),
        };
    } catch (error) {
        console.error("Error fetching day availability:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
