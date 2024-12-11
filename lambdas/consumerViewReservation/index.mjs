import mysql from 'mysql';

export const handler = async (event) => {
    const { confirmationCode } = event;

    if (!confirmationCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing confirmationCode." }),
        };
    }

    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const getReservationDetails = () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT Restaurants.name, 
                        Reservations.reservationDate, 
                        Reservations.reservationTime, 
                        Reservations.partySize 
                 FROM Reservations 
                 JOIN Restaurants ON Reservations.restaurantID = Restaurants.restaurantID
                 WHERE Reservations.confirmationCode = ?`,
                [confirmationCode],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    };

    try {
        const results = await getReservationDetails();
        pool.end(); 

        if (results.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No reservation found with the provided confirmationCode." }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(results[0]), 
        };
    } catch (error) {
        console.error("Error fetching reservation:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
