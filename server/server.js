require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);


app.listen(process.env.MY_PORT, () => {
    console.log("Listening at ", process.env.MY_PORT)
})