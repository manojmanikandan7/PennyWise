import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db4free.net',
    user: 'pennywise',
    password: 'password',
    database: 'pennywise',
  }).promise()

export async function createUser(fname, sname, email, password) {
    const result = await pool.query(`
    INSERT INTO users (fname, sname, email, password)
    VALUES (?, ?, ?, ?)
    `, [fname, sname, email, password])
    return result
}

export async function getLogin(email) {
    const [rows] = await pool.query(`
    SELECT email, password FROM users
    WHERE email = ?
    `, [email])

    if (rows.length == 0) {
        console.log("No record found for " + email)
    }
    return rows
}

export async function getSpendingData(uid) {
    const [rows] = await pool.query(`
    SELECT value, payment_date FROM payments
    WHERE user_id = ? AND direction = 'out'
    `, [uid])

    if (rows.length == 0) {
        console.log("No payment data found for user with id " + uid)
    }

    return rows
}
