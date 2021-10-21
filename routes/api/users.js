const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");

//GET//

router.get("/:founder_id", async (req, res, next) => {
    try {
        const { founder_id } = req.params;
        const response = await pool.query(`SELECT 
            f.founder_id,
            f.founder_first_name,
            f.founder_last_name,
            f.founder_primary_email,
            f.founder_pic,
            f.founder_bio,
            f.date_created,
            f.status,
            (SELECT array_agg(c.company_id) as related_company_ids FROM companies c LEFT JOIN founders_company j ON c.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
            (SELECT array_agg(c.company_name) as related_company_name FROM companies c LEFT JOIN founders_company j ON c.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
            (SELECT array_agg(p.job_id) as related_job_ids FROM job_postings p LEFT JOIN founders_company j ON p.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
            (SELECT array_agg(p.job_title) as related_job_name FROM job_postings p LEFT JOIN founders_company j ON p.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1)
        FROM founders f
        WHERE f.founder_id = $1`, [founder_id]);
        res.json(response.rows);
        console.log('success');
    } catch (err) {
        console.error(err.message);
    }
});

//EDIT USER//

router.put("/", async (req, res, next) => {
    let { founder_bio, founder_primary_email, status, date_created, founder_id } = req.body;

    console.log({
        founder_bio,
        founder_primary_email,
        status,
        date_created,
        founder_id
    });

    pool.query(
        `UPDATE founders SET
            founder_bio = $1,
            founder_primary_email = $2,
            status = $3,
            date_created = $4
        WHERE founder_id = $5
        RETURNING founder_id`, [founder_bio, founder_primary_email, status, date_created, founder_id], (err, results)=>{
            if (err) {
                throw err;
            }
            console.error(results.rows);

            pool.query(`
                SELECT 
                    f.founder_id,
                    f.founder_first_name,
                    f.founder_last_name,
                    f.founder_primary_email,
                    f.founder_pic,
                    f.founder_bio,
                    f.date_created,
                    f.status,
                    (SELECT array_agg(c.company_id) as related_company_ids FROM companies c LEFT JOIN founders_company j ON c.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
                    (SELECT array_agg(c.company_name) as related_company_name FROM companies c LEFT JOIN founders_company j ON c.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
                    (SELECT array_agg(p.job_id) as related_job_ids FROM job_postings p LEFT JOIN founders_company j ON p.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1),
                    (SELECT array_agg(p.job_title) as related_job_name FROM job_postings p LEFT JOIN founders_company j ON p.company_id = j.company_id LEFT JOIN founders f ON j.founder_id = f.founder_id WHERE f.founder_id = $1)
                FROM founders f
                WHERE f.founder_id = $1`, [founder_id],
                    (err, results) => {
                        if(err) {
                            throw err;
                        }
                        const user = results.rows
                        res.json(user);
                    }
            )       
        }
    );
    
});

module.exports = router;