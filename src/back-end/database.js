import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db4free.net',
    user: 'pennywise',
    password: 'password',
    database: 'pennywise',
  }).promise()

export async function storeName(fname, sname) {
    const result = await pool.query(`
    INSERT INTO name (fname, sname)
    VALUES (?, ?)
    `, [fname, sname])
    return result
}

export async function storeLogin(email, password) {
    const result = await pool.query(`
    INSERT INTO login (email, password) 
    VALUES (?, ?)
    `, [email, password])
    return result
}

export async function getLogin(email, password) {
    const [rows] = await pool.query(`
    SELECT email, password FROM login
    WHERE email = ? AND password = ?
    `, [email, password])

    if (rows.length == 0) {
        console.log("No record found for " + email + " " + password)
    }
    return rows
}
