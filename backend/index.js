const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const port = process.env.PORT || 5000;
const db = require("./db");

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());

// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/api/',require("./routes/userRoutes"));
app.use('/api/',require("./routes/jobsRoutes"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

