const express = require("express");
const fs = require("fs");
const app = express();
const { connection} = require("./config/database");
const {userRouter} = require('./Routes/routes')
const {noteRouter} = require('./Routes/note.route')
const cors = require("cors")
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello home page");
});

app.use('/user',userRouter)

app.use('/note',noteRouter)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on http://localhost:${PORT}`);
});
