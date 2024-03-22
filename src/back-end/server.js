import express from 'express'
import bcrypt from 'bcrypt'

import { storeLogin, getLogin } from './database.js'

const app = express()
app.use(express.json())

app.post("/name", async (req, res) => {
	try {
		const { fname, sname } = req.body
		const name = await storeName(fname, sname)
		res.send(name)
	} catch (e) {
		console.error(e)
		res.status(500).send('An error occurred')
	}
})

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body
		const hash = await bcrypt.hash(password, 15)
		const login = await storeLogin(email, hash)
		res.status(201).send(login)
	} catch (e) {
		console.error(e)
		res.status(500).send('An error occurred')
	}
})

app.get("/login", async (req, res) => {
	try {
		const { email, password } = req.body
		const login = await getLogin(email, password)
		const isMatch = await bcrypt.compare(password, login[0].password)
		if (!isMatch) {
			res.status(500).send('Invalid login')
		}
		res.status(201).send(login)
	} catch (e) {
		console.error(e)
		res.status(500).send('An error occurred')
	}
})

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke')
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
