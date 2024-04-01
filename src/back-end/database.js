import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "db4free.net",
    user: "pennywise",
    password: "password",
    database: "pennywise",
  })
  .promise();

export async function createUser(fname, sname, email, password) {
  const result = await pool.query(
    `
    INSERT INTO users (fname, sname, email, password)
    VALUES (?, ?, ?, ?)
    `,
    [fname, sname, email, password]
  );
  return result;
}

export async function getLogin(email) {
  const [rows] = await pool.query(
    `
    SELECT email, password FROM users
    WHERE email = ?
    `,
    [email]
  );

  if (rows.length == 0) {
    console.log("No record found for " + email);
  }
  return rows;
}

export async function getSpendingData(uid) {
  const [rows] = await pool.query(
    `
    SELECT payment_id, description, value, payment_date, category FROM payments
    WHERE user_id = ? AND direction = 'out'
    `,
    [uid]
  );

  if (rows.length == 0) {
    console.log("No payment data found for user with id " + uid);
  }

  return rows;
}

export async function getPayments(uid, date) {
  // Return all the payments from a given day

  var dateObj = new Date(date);
  var formattedDate =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate();

  const [rows] = await pool.query(
    `
    SELECT value, description, category, direction FROM payments
    WHERE user_id = ? AND payment_date = ?
    `,
    [uid, formattedDate]
  );

  if (rows.length == 0) {
    console.log(
      "No payment data found for user with id " +
        uid +
        " and date " +
        formattedDate
    );
  }

  for (const row of rows) {
    row.value = String(row.value);

    // Check if we need to add extra 0's at the end of the value
    let parts = row.value.split(".");
    if (parts.length === 1) {
      row.value += ".00";
    } else if (parts[1].length === 1) {
      row.value += "0";
    }
  }

  return rows;
}

export async function addTransaction(uid, date, value, title, category) {
  const result = await pool.query(
    `
    INSERT INTO payments (user_id, direction, payment_date, value, description, category)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [uid, "out", date, value, title, category]
  );
  return result;
}
