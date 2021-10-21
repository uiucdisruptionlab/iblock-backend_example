const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");
const axios = require('axios');
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Connection } = require('pg');

//LinkedIn API Call//

router.post("/", async (req, res, next) => {

    let { code, state } = req.body;

    console.log({
        code,
        state,
    });

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const authCodeAPI = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='+code+'&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth_callback&client_id=783d8sq409t4j2&client_secret=cNAKmkN6kYaaOABc';

    const linkedinRequest = axios.post(authCodeAPI, config)
        .then((code) => {
            const accessToken = code.data.access_token
            console.log(code);

            //Headers for me, pic, & email//
            const config2 = {
                headers: {
                    'Authorization': 'Bearer '+accessToken,
                    'Connection': 'keep-alive'
                }
            }

            //Linkedin APIs//

            const meAPI = 'https://api.linkedin.com/v2/me';
            const picAPI = 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))';
            const emailAPI = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';

            //LinkedIn Calls//

            const linkedinBasicInfo = axios.get(meAPI, config2)
            const linkedinPicture = axios.get(picAPI, config2)
            const linkedinEmail = axios.get(emailAPI, config2)

            axios.all([linkedinBasicInfo, linkedinPicture, linkedinEmail])
                .then(
                    axios.spread((...allData) => {
                        const allDataMe = allData[0]
                        const allDataPic = allData[1]
                        const allDataEmail = allData[2]
                        const linkedinData = {
                            first_name: allDataMe.data.localizedFirstName,
                            last_name: allDataMe.data.localizedLastName,
                            linkedin_id: allDataMe.data.id,
                            linkedin_pic: allDataPic.data.profilePicture["displayImage~"].elements[1].identifiers[0].identifier,
                            linkedin_email: allDataEmail.data.elements[0]["handle~"].emailAddress
                        }
                        //res.json(linkedinData);
                        console.log(linkedinData);
                        return linkedinData;
                    }))
                .then(
                    (linkedinData) => {
                    pool.query(
                        `SELECT founder_id, founder_first_name, founder_last_name FROM founders
                        WHERE founder_primary_email = $1`,
                        [linkedinData.linkedin_email], (err, results)=>{
                            if(err){
                                console.log(err);
                                throw err;
                            }
                            if(results.rows.length > 0) {
                                console.log('Email already registered - Loggingin');
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
                            }else{
                                console.log('Email not already registered - Adding user');
                                pool.query(
                                    `INSERT INTO founders (founder_first_name, founder_last_name, founder_primary_email, linkedin_id, founder_pic)
                                    VALUES ($1, $2, $3, $4, $5)
                                    RETURNING founder_id, founder_first_name, founder_last_name`,
                                    [linkedinData.first_name, linkedinData.last_name, linkedinData.linkedin_email, linkedinData.linkedin_id, linkedinData.linkedin_pic],
                                    (err, results) => {
                                        if(err) {
                                            console.log(err);
                                            throw err;
                                        }else{
                                            console.log('NOW: %s', results);
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
                                            })
                                        }
                                    }
                                );
                            }
                        }
                    );
                })
        }).catch(err => console.log(err))
});

module.exports = router;