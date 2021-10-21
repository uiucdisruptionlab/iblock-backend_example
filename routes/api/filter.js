const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");

//FILTER//

router.post("/", async (req, res, next) => {
    
    
    try {
        let { job_title, job_category} = req.body;
        const response = await pool.query(`SELECT 
            j.job_id,
            j.job_title,
            j.short_job_description,
            j.long_job_description,
            j.job_category,
            j.location_city,
            j.location_state,
            j.date_posted,
            j.equity_model,
            (SELECT CONCAT(f.founder_first_name,' ',f.founder_last_name) as founder_name FROM founders f WHERE o.founder_id = f.founder_id),
            j.company_id,
            (SELECT c.company_name FROM companies c WHERE j.company_id = c.company_id),
            j.time_commitment,
            j.skills
        FROM job_postings j
        LEFT JOIN companies c ON j.company_id = c.company_id
        LEFT JOIN founders_company o ON c.company_id = o.company_id
        LEFT JOIN founders f ON o.founder_id = f.founder_id
        WHERE job_title ILIKE '%'||$1||'%'`, [job_title]);
        res.json(response.rows);
        console.log('success');
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;