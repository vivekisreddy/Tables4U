import mysql from 'mysql'; 

export const handler = async (event) => {
    const { resID, name, address, openTime, closeTime, tables, seats, closedDays } = event;

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

    // Validation: Required fields
    if (!resID || !name || !address || openTime === undefined || closeTime === undefined || tables === undefined || !seats || seats.length !== tables) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Incomplete information or mismatch in seat/table count." }),
        };
    }

    // Ensure seats are even and within valid range
    if (seats.some((seat) => seat < 2 || seat > 8)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Seats must be between 2 and 8." }),
        };
    }

    // Ensure openTime < closeTime
    if (openTime >= closeTime) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Opening time must be earlier than closing time." }),
        };
    }

    console.log('Incoming restaurant data:', { resID, name, address, openTime, closeTime, tables, seats, closedDays });

    // Database connection
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const updateRestaurant = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE Restaurants
                 SET name = ?, address = ?, openTime = ?, closeTime = ?
                 WHERE restaurantID = ?;`,
                [name, address, openTime, closeTime, resID],
                (error, results) => (error ? reject(error) : resolve(results))
            );
        });
    };

    const deleteExistingTables = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM Tables WHERE restaurantID = ?;`,
                [resID],
                (error, results) => (error ? reject(error) : resolve(results))
            );
        });
    };

    const insertNewTables = () => {
        const tableValues = seats.map((seatsCount, index) => [
            resID,
            `${resID}-T${index + 1}`,
            seatsCount,
            index + 1
        ]);

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO Tables (restaurantID, tableID, seats, tables) VALUES ?;`,
                [tableValues],
                (error, results) => (error ? reject(error) : resolve(results))
            );
        });
    };

    const updateClosedDays = () => {
        // Remove any previous closed dates for the restaurant
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM ClosedDays WHERE restaurantID = ?;`,
                [resID],
                (error, results) => {
                    if (error) return reject(error);

                    // Now insert the new closed days into the ClosedDays table
                    const closedDaysValues = closedDays.map((closedDate) => [
                        resID,
                        closedDate,
                    ]);

                    pool.query(
                        `INSERT INTO ClosedDays (restaurantID, closedDate) VALUES ?;`,
                        [closedDaysValues],
                        (error, results) => (error ? reject(error) : resolve(results))
                    );
                }
            );
        });
    };

    try {
        const restaurant = await findRestaurant(resID);
        if (restaurant.isActive === 1) {  // Checking if restaurant is already active
            return {
                statusCode: 400,
                body: JSON.stringify({ error: `Cannot edit Active Restaurant.` }),
            };
        }

        // Step 2: Update restaurant details
        await updateRestaurant();

        // Step 3: Delete existing tables
        await deleteExistingTables();

        // Step 4: Insert new tables
        await insertNewTables();

        // Step 5: Update closed days
        if (closedDays && closedDays.length > 0) {
            await updateClosedDays();
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Restaurant has been edited successfully." }),
        };
    } catch (error) {
        console.error("Error editing restaurant:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    } finally {
        pool.end(); // Ensure the connection pool is closed
    }
};
