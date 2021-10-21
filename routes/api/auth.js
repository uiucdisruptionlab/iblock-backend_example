const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//AUTH//

router.post("/", async (req, res) => {
    let { email, password } = req.body;

    console.log({
        email,
        password,
    });

    let errors = [];

    if (!email || !password) {
        errors.push({message: "Please enter all fields"});
        }

    if (errors.length > 0) {
        res.status(400).json({errors});
    }else{
        
        pool.query(
            `SELECT * FROM founders
            WHERE founder_primary_email = $1`, 
            [email], (err, results)=>{
                if (err) {
                    console.error(err);
                    }  
                    console.error(results.rows.length);

                    if (results.rows.length === 0) {
                        return (
                        res.status(400).json({message: "User does not exsist"}));
                    

                    }else{
                        bcrypt.compare(password, results.rows[0].password)
                            .then(isMatch => {
                                if(!isMatch) return res.status(400).json({ msg: `Invalid login again` });
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
                            })
                    }
            }
        );
    }
});

// GET USER DATA //
router.get("/", auth, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await pool.query("SELECT * FROM founders WHERE founder_id = $1", [id])
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = router;