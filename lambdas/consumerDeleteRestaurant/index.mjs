import mysql from "mysql";

export const handler = async (event) => {
    // Create a connection pool to interact with the MySQL database
    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    // Extract the confirmation code from the event
    const { confirmationCode } = event;
    if (!confirmationCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing confirmation code." }),
        };
    }

    // Function to find a reservation by confirmation code
    const findReservation = (confirmationCode) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Reservations WHERE confirmationCode = ?;",
                [confirmationCode],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No reservation found
                    return resolve(results[0]); // Return the reservation if found
                }
            );
        });
    };

    // Function to delete a reservation by confirmation code
    const deleteReservation = (confirmationCode) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "DELETE FROM Reservations WHERE confirmationCode = ?;",
                [confirmationCode],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.affectedRows === 0) return resolve(false); // No rows affected
                    return resolve(true); // Successfully deleted
                }
            );
        });
    };

    try {
        // Check if the reservation exists in the database
        const reservation = await findReservation(confirmationCode);

        // If reservation not found, return an error response
        if (!reservation) {
            return {
                statusCode: 404,
                body: JSON.stringify({ success: false, message: "Reservation not found." }),
            };
        }

        // Delete the reservation if it exists
        const deleteSuccess = await deleteReservation(confirmationCode);

        if (!deleteSuccess) {
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Failed to delete reservation." }),
            };
        }

        // Return success response with a message
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Reservation deleted successfully!" }),
        };
    } catch (error) {
        // Log the error and return a server error response
        console.error("Error deleting reservation:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        // Close the connection pool after the operation
        pool.end();
    }
};
