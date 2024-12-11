import mysql from 'mysql';

export const handler = async (event) => {
    const {resID, dateToClose} = event;

    if (!resID || !dateToClose) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid Search Information" }),
        };
    }
    // Create a connection pool to the database
    const pool = mysql.createPool({
       host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
       user: "calcAdmin",
       password: "aws26RDSVK",
       database: "Tables4U",
    });

    const findDate = (dateToClose) => {
        return new Promise((resolve, reject) => {
            console.log("in find");
            pool.query(
                "SELECT closedDate FROM ClosedDays WHERE restaurantID = ? AND closedDate = ?;",
                [resID, dateToClose],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); 
                    return resolve(results[0].closedDate); // Return the restaurant if found
                }
            );
        });
    }

    const updateClosedDates = (dateToClose) => {
        return new Promise((resolve, reject) => {
            console.log("in update");
            pool.query(
                "INSERT INTO ClosedDays (restaurantID, closedDate) VALUES (?, ?);",
                [resID, dateToClose],
                (error, results) => {
                    console.log(results);
                    if (error) return reject(error);
                    resolve(results); // Assuming the ID of the restaurant is returned here
                }
            );
        });
    };

    try {
        const foundDate = await findDate(dateToClose);

        if (!foundDate) {
            await updateClosedDates(dateToClose);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Closed dates updated successfully" }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Date already exists in the closedDays list" }),
            };
        }

    } catch (error) {
        console.error("Error closing date:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        pool.end(); 
    }
};