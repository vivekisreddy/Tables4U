import mysql from 'mysql';

export const handler = async (event) => {
    let code = event.confirmationCode;

    // Create a connection pool to interact with the MySQL database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Function to find a reservation by confirmation code
    const findReservation = (code) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Reservations WHERE confirmationCode = ?;",
                [code],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No reservation found
                    return resolve(results[0]); // Return the reservation, if found
                }
            );
        });
    };

    // Function to delete a reservation by confirmation code
    const deleteReservation = (code) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "DELETE FROM Reservations WHERE confirmationCode = ?;",
                [code],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.affectedRows === 0) return resolve(null); // If no rows were affected
                    return resolve(results[0]); // Return the result if restaurant was deleted
                }
            );
        });
    };

    try {
        // Check if the reservation exists in the database
        const reservation = await findReservation(code);

        // If reservation not found, return an error response
        if (!reservation) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "Reservation not found." }),
            };
        } else {
            // Delete the reservation if it exists
            await deleteReservation(code);

            // Return success response with message
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: "Reservation deleted!" }), // Custom success message
            };
        }
    } catch (error) {
        // Log the error and return a server error response
        // console.error("Error Deleting Reservation", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        pool.end();  // Close the connection pool after the operation
    }
};