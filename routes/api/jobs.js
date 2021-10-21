const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");

//GET//

router.get("/:job_id", async (req, res, next) => {
    try {
        const { job_id } = req.params;
        const response = await pool.query(`SELECT 
            p.job_id,
            p.job_title,
            p.short_job_description,
            p.long_job_description,
            p.job_category,
            p.location_city,
            p.location_state,
            p.date_posted,
            p.equity_model,
            p.company_id,
            p.time_commitment,
            c.company_name
        FROM job_postings p
        LEFT JOIN companies c ON c.company_id = p.company_id
        WHERE job_id = $1`, [job_id]);
        res.json(response.rows);
        console.log('success');
    } catch (err) {
        console.error(err.message);
    }
});

//ADD//

router.put("/", async (req, res, next) => {
    try {
        const { job_title, short_job_description, long_job_description, job_category, location_city, location_state, equity_model, company_id, time_commitment, skills } = req.body;
        const response = await pool.query(
            `INSERT INTO job_postings (
                    job_title,
                    short_job_description,
                    long_job_description,
                    job_category,
                    location_city,
                    location_state,
                    date_posted,
                    equity_model,
                    company_id,
                    time_commitment,
                    skills)
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    CURRENT_DATE,
                    $7,
                    $8,
                    $9,
                    $10)
                RETURNING job_id`, [job_title, short_job_description, long_job_description, job_category, location_city, location_state, equity_model, company_id, time_commitment, skills]);
        res.json(response.rows[0]);
        console.log('Job Added');
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = router;