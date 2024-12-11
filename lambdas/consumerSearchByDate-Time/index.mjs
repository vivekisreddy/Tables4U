import mysql from 'mysql';

// Create a connection pool to the database
const pool = mysql.createPool({
  host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
  user: "calcAdmin",
  password: "aws26RDSVK",
  database: "Tables4U",
});

export const handler = async (event) => {
  const { date, time } = event; // Date and time inputs from the consumer
  const isValidDate = (d) => !isNaN(Date.parse(d)); // Helper function to validate date format

  if (!date || !time || !isValidDate(date)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid date or time input." }),
    };
  }

  try {
    // Format the date and time correctly for comparison
    const formattedDate = new Date(date).toISOString().split('T')[0]; // 'YYYY-MM-DD' format
    const inputTime = parseInt(time, 10);

    if (isNaN(inputTime) || inputTime < 0 || inputTime > 24) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid time input." }),
      };
    }

    // Step 1: Get all restaurants that are open on the given date and time and are active
    const getOpenRestaurantsQuery = `
      SELECT r.restaurantID, r.name, r.address, r.openTime, r.closeTime
      FROM Restaurants r
      LEFT JOIN ClosedDays c ON r.restaurantID = c.restaurantID AND c.closedDate = ?
      WHERE c.closedDate IS NULL AND r.openTime <= ? AND r.closeTime >= ? AND r.isActive = 1; 
    `;

    const openRestaurants = await query(getOpenRestaurantsQuery, [formattedDate, inputTime, inputTime]);

    if (openRestaurants.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No active restaurants are available at the given time and date." }),
      };
    }

    // Step 2: For each open restaurant, find available tables that are not reserved
    const availableRestaurants = [];

    for (const restaurant of openRestaurants) {
      const { restaurantID, name, address, openTime, closeTime } = restaurant;

      // Get tables for this restaurant that are not reserved at the given time and date
      const getAvailableTablesQuery = `
        SELECT t.tables
        FROM Tables t
        WHERE t.restaurantID = ?
        AND NOT EXISTS (
          SELECT 1
          FROM Reservations r
          WHERE r.restaurantID = t.restaurantID
          AND r.tableID = t.tableID
          AND r.reservationDate = ?
          AND r.reservationTime = ?
        );
      `;

      const availableTables = await query(getAvailableTablesQuery, [restaurantID, formattedDate, inputTime]);

      if (availableTables.length > 0) {
        // Only include available table numbers
        const availableTableNumbers = availableTables.map((table) => table.tables); // `tables` contains the table number

        availableRestaurants.push({
          name,
          address,
          openTime,
          closeTime,
          availableTables: availableTableNumbers, // Show only available table numbers
        });
      }
    }

    if (availableRestaurants.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No available tables at the given time and date." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(availableRestaurants),
    };
  } catch (error) {
    console.error("Error processing the request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

// Helper function to execute a MySQL query and return a promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
