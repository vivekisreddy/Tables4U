import mysql from 'mysql';

export const handler = async (event) => {
  // parse input parameters from the event
  const{email} = event.arg1;
  const{password} = event.arg2;

  // input validation
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
  const pool = mysql.createPool({
    host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
    user: "calcAdmin",
    password: "aws26RDSVK",
    database: "Tables4U",
  });
  
  // helper function to check if the admin account is already created
  const getAdminAccount = (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT email FROM Admin WHERE email = ?;",
        [email],
        (error, results) => {
          if (error) return reject(error);
          if (results.length === 0) return resolve(null)  // no admin account found (good in this case)
          return resolve(results[0])
        }
      );
    });
  };
  
  // helper function to create new admin
  const createAdminAccount = (email, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO Admin (email, password)",
        [email],
        [password],
        (error, results) => {
          if (error) return reject(error);
          return resolve(error)
        }
      );
    });
  };

  try {
    // step 1: make sure the email is not already associated with an account
    const newEmail = await getAdminAccount(email);

    if (newEmail) {
      return {
        statusCode: 400,
        error: 'The email "${newEmail}" is already associated with an admin account"'
      }
    }

    // step 2: create the admin account
    if (!newEmail) {
      await createAdminAccount(email, password);
    }

    // close the database
    pool.end();

    // return success response
    return {
      statusCode: 200,
      message: 'An admin account with the email "${email}" and password "${password}" has been created.'
    };
  } catch (error) {
    console.error("Error creating admin account:", error);

    // return error response
    return {
      statusCode: 500,
      error: "Internal Service Error",
    };
  }
};