import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "db4free.net",
    user: "pennywise",
    password: "password",
    database: "pennywise",
  })
  .promise();

export async function createUser(fname, sname, email, password, budget) {
  const result = await pool.query(
    `
    INSERT INTO users (fname, sname, email, password, budget)
    VALUES (?, ?, ?, ?, ?)
    `,
    [fname, sname, email, password, budget]
  );
  return result;
}

export async function getLogin(email) {
  const [rows] = await pool.query(
    `
    SELECT id, email, password FROM users
    WHERE email = ?
    `,
    [email]
  );

  if (rows.length == 0) {
    console.log("No record found for " + email);
  }
  return rows;
}

export async function getInfo(id) {
  const [rows] = await pool.query(
    `
    SELECT id, email, password, fname, sname FROM users
    WHERE id = ?
    `,
    [id]
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

export async function getTransactionsInMonth(uid, monthIndex, endDate) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM payments
    WHERE MONTH(payment_date) = ? AND DAY(payment_date) <= ?
    AND user_id = ?;
    `,
    [monthIndex, endDate, uid]
  );

  if (rows.length == 0) {
    console.log("No payment data found for user with id " + uid + " in month " + monthIndex);
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

export async function removeTransaction(pid) {
  const result = await pool.query(
    `
    DELETE FROM payments WHERE payment_id = ?;
    `,
    [pid]
  );
  return result;
}

export async function editTransaction(pid, description, value, payment_date, category) {
  const result = await pool.query(
    `
    UPDATE payments
    SET payment_date = ?, value = ?, description = ?, category = ?
    WHERE payment_id = ?;
    `,
    [payment_date, value, description, category, pid]
  );
  return result;
}

export async function editInfo(uid, fname, sname, email, password) {
  const result = await pool.query(
    `
    UPDATE users
    SET fname = ?, sname = ?, email = ?, password = ?
    WHERE id = ?;
    `,
    [fname, sname, email, password, uid],
  );
  return result;
}

export async function getUserInfo(uid) {
  const result = await pool.query(
    `
    SELECT fname, sname, email, password, budget FROM users
    WHERE id = ?;
    `,
    [uid],
  );
  return result;
}

export async function getRecentTransactions(uid) {
    const [result] = await pool.query(
    `
    SELECT payment_id, description, value, payment_date, category
    FROM payments
    WHERE direction = 'out' AND user_id = ?
    ORDER BY payment_date DESC
    LIMIT 10
    `,
    [uid]
  );
 
  return result;
}

export async function getBills(uid) {
  const [rows] = await pool.query(
    `
    SELECT bill_id, start_date, end_date, value, description, category, recurrence_freq FROM bills
    WHERE user_id = ?
    `,
    [uid]
  );

  return rows;
}

export async function addBill(uid, start, end, value, desc, category, recurrence) {
  const result = await pool.query(
    `
    INSERT INTO bills (user_id, direction, start_date, end_date, value, description, category, recurrence_freq)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [uid, "out", start, end, value, desc, category, recurrence]
  );
  return result;
}

export async function editBill(bid, start, end, value, desc, category, recurrence) {
  const result = await pool.query(
    `
    UPDATE bills
    SET start_date = ?, end_date = ?, value = ?, description = ?, category = ?, recurrence_freq = ?
    WHERE bill_id = ?;
    `,
    [start, end, value, desc, category, recurrence, bid]
  );
  return result;
}

export async function removeBill(bid) {
  const result = await pool.query(
    `
    DELETE FROM bills WHERE bill_id = ?;
    `,
    [bid]
  );
  return result;
}

