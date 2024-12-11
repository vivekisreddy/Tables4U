import mysql from 'mysql';

// Helper function to generate a random 6-digit confirmation code
const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
};

export const handler = async (event) => {
    const { restaurantName, reservationDate, reservationTime, partySize, consumerEmail } = event;

    if (!restaurantName || !reservationDate || !reservationTime || partySize === undefined || !consumerEmail) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Incomplete information provided." }),
        };
    }

    if (partySize < 1 || partySize > 8) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Party size must be between 1 and 8." }),
        };
    }

    // Parse the reservation date and time
    const currentDate = new Date();
    const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);

    if (reservationDateTime < currentDate) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "The reservation date and time must be in the future." }),
        };
    }

    // Database connection pool
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Helper function to check if the restaurant exists and is active
    const checkIfRestaurantExists = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT restaurantID FROM Restaurants WHERE name = ? AND isActive = 1;`,
                [restaurantName],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    // Helper function to find available tables for the reservation
    const findAvailableTable = (restaurantID, partySize) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT tableID, seats FROM Tables WHERE restaurantID = ? AND seats >= ? AND tableID NOT IN (
                    SELECT tableID FROM Reservations WHERE restaurantID = ? AND reservationDate = ? AND reservationTime = ?
                );`,
                [restaurantID, partySize, restaurantID, reservationDate, reservationTime],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    // Helper function to create a reservation
    const createReservation = (restaurantID, tableID, reservationDate, reservationTime, partySize, consumerEmail, confirmationCode) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO Reservations (restaurantID, tableID, reservationDate, reservationTime, partySize, consumerEmail, confirmationCode) 
                VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [restaurantID, tableID, reservationDate, reservationTime, partySize, consumerEmail, confirmationCode],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    try {
        // Step 1: Check if the restaurant exists and is active
        const restaurant = await checkIfRestaurantExists();

        if (restaurant.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Restaurant does not exist or is not active." }),
            };
        }

        const restaurantID = restaurant[0].restaurantID;

        // Step 2: Find an available table for the reservation
        const availableTables = await findAvailableTable(restaurantID, partySize);

        if (availableTables.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No available tables for the specified party size at this time." }),
            };
        }

        // Step 3: Generate a random 6-digit confirmation code
        const confirmationCode = generateRandomCode();

        // Step 4: Create the reservation
        const tableID = availableTables[0].tableID;
        await createReservation(restaurantID, tableID, reservationDate, reservationTime, partySize, consumerEmail, confirmationCode);

        // Close the database connection pool
        pool.end();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Reservation successful!",
                confirmationCode: confirmationCode,
                tableID: tableID,
                partySize: partySize,
                reservationDate: reservationDate,
                reservationTime: reservationTime,
            }),
        };
    } catch (error) {
        console.error("Error making reservation:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
