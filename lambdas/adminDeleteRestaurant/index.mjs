import mysql from 'mysql';

export const handler = async (event) => {
  // parse input parameters from event
  const {email} = event.arg1;
  const {password} = event.arg2;
}

// input(s) validation
if (!email) {
  return {
    statusCode: 400,
    error: "Missing required field: email",
  };
}
if (!password) {
  return {
    statusCode: 400,
    error: "Missing required field: password",
  };
}

// create a connection pool to the database
const pool = mysql.createPool ({
  host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
  user: "calcAdmin",
  password: "aws26RDSVK",
  database: "Tables4U",
})

// helper function to find the admin email
const getAdminEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT email FROM Admin WHERE email = ?;",
      [email],
      (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null); // no email found
        return resolve(results[0]);
      }
    );
  });
};

// helper function to check if password matches email
const getAdminPassword = (password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT email FROM Admin WHERE password = ?;",
      [password],
      (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null)  // password does not match email
        return resolve(results[0])
      }
    );
  });
};

try {
  // step 1: check if the admin email exits
  const adminEmail = await getAdminEmail(email);

  if (!adminEmail) {
    return {
      statusCode: 404,
      error: "Email not found",
    };
  }

  // step 2: check if the password matches the email
  const adminPassword = await getAdminPassword(password);

  if (adminEmail) {
    if (!adminPassword) {
      return {
        statusCode: 404,
        error: "Incorrect password",
      };
    };
  }

  // close the database connection pool
  pool.end();

  // return success response
  return {
    statusCode: 200,
    message: 'The account with email "${admin.email}" and password "${admin.password}" exists.'
  };
}catch (error) {
  console.error("Admin account does not exists:", error);

  // return error response
  return {
    statusCode: 500,
    error: "Internal Service Error",
  };
}