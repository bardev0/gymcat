import express = require('express')
import { Request, Response } from 'express'

const PORT = 5001
const app = express()

app.get('/test', (req: Request, res: Response) => {
	console.log(`endpoint /test reached !`)
	res.send("endpoint available")
})

app.listen(PORT, () => {
	console.log(`Server succesfully started on port : ${PORT} !`)
})
