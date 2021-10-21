const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const jwt = require('jsonwebtoken');

//CREATE NEW USER - REGISTER //

router.post("/", async (req, res) => {
    let { first_name, last_name, email, password, password2 } = req.body;

    console.log({
        first_name,
        last_name,
        email,
        password,
        password2
    });

    let errors = [];

    if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({message: "Please enter all fields"});
        }

    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters"});
        }

    if (password != password2) {
        errors.push({ message: "Passwords do not match"});
        }

    if (errors.length > 0) {
        res.status(400).json({errors});
    }else{
        
        let salt = await bcrypt.genSalt(10);
        
        let hashedPassword = await bcrypt.hash(password, salt);

        pool.query(
            `SELECT * FROM founders
            WHERE founder_primary_email = $1`, [email], (err, results)=>{
                if (err) {
                    throw err;
                }
                console.error(results.rows);

                if(results.rows.length > 0) {
                    errors.push({message: "Email already registered"});
                    res.status(400).json({ errors });
                }else{
                    pool.query(
                        `INSERT INTO founders (founder_first_name, founder_last_name, founder_primary_email, password)
                        VALUES ($1, $2, $3, $4)
                        RETURNING founder_id, password, founder_first_name, founder_last_name`,
                        [first_name, last_name, email, hashedPassword],
                        (err, results) => {
                            if(err) {
                                throw err;
                            }
                            jwt.sign(
                                { id: results.rows[0].founder_id },
                                process.env.SESSION_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    const user = results.rows
                                    res.json({
                                        token,
                                        user
                                    });
                                }
                            )
                        }
                    )
                }
            }
        );
    }
});

module.exports = router;