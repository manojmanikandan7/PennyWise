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
