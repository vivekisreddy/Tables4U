import mysql from 'mysql';

export const handler = async (event) => {
    let restaurantID = event.resID
    let start = event.startDate
    let end = event.endDate

    const occupiedSeats = [];
    const totalSeats = [];
    let tables = [];

    let numOccupiedSeats = 0
    let numTotalSeats = 0

    const report = [];

    // Create a connection pool to the database
    const pool = mysql.createPool({
       host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
       user: "calcAdmin",
       password: "aws26RDSVK",
       database: "Tables4U",
    });

    // helper function to find restaurant
    const findRestaurant = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Restaurants WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No restaurant found
                    return resolve(results[0]); // Return the restaurant if found
                }
            );
        });
    };

    // helper function to find the tables in the restaurant
    const findTables = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Tables WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No tables found
                    return resolve(results); // Return the tables, if found
                }
            );
        });
    };

    // helper function to search for a reservation at a specific date and time
    const findReservation = (date, time) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Reservations WHERE reservationDate = ? AND reservationTime = ?;",
                [date, time],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No reservations found
                    return resolve(results); // Return the reservations, if found
                }
            );
        });
    };

    // helper function to find open time
    const findOpenTime = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query (
                "SELECT openTime FROM Restaurants WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null);
                    return resolve(results[0]);
                }
            )
        })
    }

    // helper function to find close time
    const findCloseTime = (restaurantID) => {
        return new Promise((resolve, reject) => {
            pool.query (
                "SELECT closeTime FROM Restaurants WHERE restaurantID = ?;",
                [restaurantID],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null);
                    return resolve(results[0]);
                }
            )
        })
    }

    // helper function to generate the range of dates
    function dateRange(start, end) {
        const dates = [];
        const startDate = new Date(start);
        const endDate = new Date(end);

        for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate()+1)) {
            const formattedDate = dt.toISOString().split('T')[0];
            dates.push(formattedDate)
        }
        return dates;
    }

    // helper function to calculate utilization
    function calcUtilization() {
        for (let z=0; z<=occupiedSeats.length-1; z++) {
            numOccupiedSeats = numOccupiedSeats + occupiedSeats[z]
        }
        for (let e=0; e<=totalSeats.length-1; e++) {
            numTotalSeats = numTotalSeats + totalSeats[e]
        }
        let utilization = numOccupiedSeats / numTotalSeats
        let percentUtilization = utilization * 100
        numOccupiedSeats = 0
        numTotalSeats = 0
        return percentUtilization
    }

    // helper function to calculate availability
    function calcAvailability() {
        let occupiedTables = occupiedSeats.length
        let totalTables = tables.length
        let availability = 1 - (occupiedTables / totalTables)
        let percentAvailability = availability * 100
        return percentAvailability
    }

    try {
        // check to see if the restaurant exists
        const restaurant = await findRestaurant(restaurantID)

        // if the restaurant does not exist
        if(!restaurant) {
            return {
                statusCode: 400,
                body: JSON.stringify({success:false, message:"Restaurant not found. Cannot generate report."}),
            };
        } else {
            // generate the range of dates
            const dates = dateRange(start, end);
            console.log(dates)

            // find open and close time of the restaurant
            const opened = await findOpenTime(restaurantID)
            const closed = await findCloseTime(restaurantID)
            const open = opened.openTime
            const close = closed.closeTime

            // find all the tables in the restaurant
            tables = await findTables(restaurantID)
            for (let n=0; n<=tables.length-1; n++) {
                totalSeats.push(tables[n].seats)
            }

            // iterate through dates
            for (let i=0; i<=dates.length-1; i++) {
                let date = dates[i]
        
                // iterate through times
                for (let t=open; t<close; t++) {
                    let time = t
                    const reservations = await findReservation(date, time)
                    
                    // if there are no reservations at that date and time
                    if(!reservations) {
                        report.push([date,time,0,100])
                    }
                    else {
                        // find the number of occupied seats
                        for (let k=0; k<=reservations.length-1; k++) {
                            occupiedSeats[k] = reservations[k].partySize
                        }
                        let u = calcUtilization()
                        let a = calcAvailability()
                        report.push([date,time,u,a])
                    }
                }

            }
        }
        console.log(report)
        return {
            statusCode: 200,
            body: JSON.stringify(report)
        }

    } catch (error) {
        console.error("Error generating availability report: ", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };

    } finally {
        pool.end();
    }
};