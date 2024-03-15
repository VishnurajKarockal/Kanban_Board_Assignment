/* eslint-disable linebreak-style */
const express = require("express")
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/user.routes")
const { TaskRouter } = require("./routes/task.routes")
require("dotenv").config()
const app = express()

app.use("/user", UserRouter)
app.use("/task", TaskRouter)
app.listen(process.env.port, async () => {
	await connection
	console.log(`Server is running at port ${process.env.port}`)
})
