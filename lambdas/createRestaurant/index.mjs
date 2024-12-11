import mysql from 'mysql';

// Helper function to generate a random string of specified length
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

export const handler = async (event) => {
    const { name, address, openTime, closeTime, tables, seats, closedDays } = event;

    if (!name || !address || openTime === undefined || closeTime === undefined || !tables || !seats || !closedDays) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Incomplete Information" }),
        };
    }

    if (tables <= 0 || tables !== seats.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Number of tables must match seat configurations." }),
        };
    }

    if (!seats.every((seat) => seat >= 1 && seat <= 8)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Seats must be between 1 and 8." }),
        };
    }

    if (openTime >= closeTime) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Opening time must be earlier than closing time." }),
        };
    }

    // Database connection pool
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Generate a random restaurantID
    const randomString = generateRandomString(8); // Length of the random string
    const restaurantID = `R-${randomString}`; // Format restaurantID as R-<randomString>

    // Helper function to check if the restaurant already exists
    const checkIfRestaurantExists = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM Restaurants WHERE name = ? AND address = ?;`,
                [name, address],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    // Insert the restaurant into the database (without closedDays)
    const insertRestaurant = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO Restaurants (restaurantID, name, address, openTime, closeTime, isActive)
                 VALUES (?, ?, ?, ?, ?, ?);`,
                [restaurantID, name, address, openTime, closeTime, 0], // Set isActive to 0 (inactive)
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    // Insert tables into the database
    const insertTables = () => {
        const tableValues = seats.map((seat, index) => [
            restaurantID,
            `${restaurantID}-T${index + 1}`, // Table ID: "R-<randomString>-T<num>"
            seat,
            index + 1,
        ]);

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO Tables (restaurantID, tableID, seats, tables) VALUES ?;`,
                [tableValues],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    // Insert closed days into the ClosedDays table
    const insertClosedDays = () => {
        const closedDayValues = closedDays.map((closedDate) => [
            restaurantID,
            closedDate, // Assuming closedDate is in a valid format (e.g., 'YYYY-MM-DD')
        ]);

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO ClosedDays (restaurantID, closedDate) VALUES ?;`,
                [closedDayValues],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    try {
        // Step 1: Check if the restaurant already exists
        const existingRestaurant = await checkIfRestaurantExists();

        if (existingRestaurant.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "A restaurant with the same name and address already exists." }),
            };
        }

        // Step 2: Insert the restaurant details
        await insertRestaurant();

        // Step 3: Insert tables for the restaurant
        await insertTables();

        // Step 4: Insert closed days for the restaurant into the ClosedDays table
        await insertClosedDays();

        // Close the database connection pool
        pool.end();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Restaurant "${name}" created successfully!`,
                restaurantID: restaurantID,
            }),
        };
    } catch (error) {
        console.error("Error creating restaurant:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
