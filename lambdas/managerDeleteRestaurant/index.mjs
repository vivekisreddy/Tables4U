import mysql from "mysql";

export const handler = async (event) => {
    const { email, password } = event;

    /*
    if (!email || !password) {
        return {
            statusCode: 400,
            error: "Missing required fields",
        };
    }
    */

    const pool = mysql.createPool({
        host: "calculatordb.craya4qa2j2l.us-east-1.rds.amazonaws.com",
        user: "calcAdmin",
        password: "aws26RDSVK",
        database: "Tables4U",
    });

    const findAdmin = (email, password) => {
        return new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM Admin WHERE adminID = ? AND password = ?;",
                [email, password],
                (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null); // No match
                    return resolve(results[0]); // Admin found
                }
            );
        });
    };

    try {
      
        const admin = await findAdmin(email, password);

        if (!admin) {
            return {
                statusCode: 400,
                body: JSON.stringify({success:false, message: "Admin not found."}),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({success: true, message: "Successfully logged in."}),
        };
    } catch (error) {
        console.error("Error Logging In", error);

        return {
            statusCode: 500,
            body: JSON.stringify({success:false, message: "Internal Server Error"}),
        };
    } finally {
        pool.end();
    }
};