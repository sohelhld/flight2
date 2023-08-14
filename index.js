const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.router');
const { flightRouter } = require('./routes/flight.router');
const { bookingRouter } = require('./routes/booking.route');


require('dotenv').config()

const app = express()

app.use(express.json())

app.use("/api",userRouter)
app.use("/api",flightRouter)
app.use("/api",bookingRouter)


app.listen(8000,async()=>{

    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
    console.log("server is runing at port number 8000");
})