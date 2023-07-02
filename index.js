require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobroutes");

const app = express();

connection();
app.use(cors()); 
app.use(express.json()); 

app.get('/test',(req, res) => {
    res.json("test ok");
})
app.use("/api/auth/", authRoutes); 
app.use("/api/job/", jobRoutes); 

// app.use("")



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));