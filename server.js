const express = require('express');
const app = express();
const cors = require("cors");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const usersRoutes = require('./routes/api/users');
const filterRoutes = require('./routes/api/filter');
const jobsRoutes = require('./routes/api/jobs');
const registerRoutes = require('./routes/api/register');
const authRoutes = require('./routes/api/auth');
const companyRoutes = require('./routes/api/company');
const linkedinRoutes = require('./routes/api/linkedin');
const chat = require('./routes/api/chat');

const PORT = process.env.PORT || 4001;

//middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/users', usersRoutes);
app.use('/filter', filterRoutes);
app.use('/jobs', jobsRoutes);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/linkedin', linkedinRoutes);
app.use('/chat', chat);

//basic commands//

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

