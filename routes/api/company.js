const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");
const auth = require('../../middleware/auth');

//GET//

router.get("/:company_id", async (req, res, next) => {
    try {
        const { company_id } = req.params;
        const response = await pool.query(`SELECT 
            c.company_id,
            c.company_name,
            c.company_bio,
            c.date_inception,
            c.date_created,
            c.website,
            c.company_info_email,
            c.company_logo,
            (SELECT array_agg(f.founder_id) as related_founder_ids FROM founders f LEFT JOIN founders_company j ON f.founder_id = j.founder_id LEFT JOIN companies c ON j.company_id = c.company_id WHERE c.company_id = $1),
            (SELECT array_agg(CONCAT(f.founder_first_name, ' ',f.founder_last_name)) as related_founder_names FROM founders f LEFT JOIN founders_company j ON f.founder_id = j.founder_id LEFT JOIN companies c ON j.company_id = c.company_id WHERE c.company_id = $1),
            (SELECT array_agg(p.job_id) as related_job_ids FROM job_postings p LEFT JOIN companies c ON p.company_id = c.company_id WHERE c.company_id = $1),
            (SELECT array_agg(p.job_title) as related_job_name FROM job_postings p LEFT JOIN companies c ON p.company_id = c.company_id WHERE c.company_id = $1)
        FROM companies c
        WHERE c.company_id = $1
        GROUP BY c.company_id`, [company_id]);
        res.json(response.rows);
        console.log('success');
    } catch (err) {
        console.error(err.message);
    }
});

//ADD//

router.put("/", auth, async (req, res, next) => {
    try {
        const { company_name, company_bio, date_inception, date_created, website, company_info_email, company_logo, founder_id, role, equity } = req.body;
        const response = await pool.query(
            `WITH comp_num AS (
                INSERT INTO companies (
                    company_name,
                    company_bio,
                    date_inception,
                    date_created,
                    website,
                    company_info_email,
                    company_logo)
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7)
                RETURNING company_id)
                INSERT INTO founders_company (founder_id, company_id, role, equity)
                SELECT $8, c.company_id, $9, $10
                FROM comp_num c
                RETURNING company_id`, [company_name, company_bio, date_inception, date_created, website, company_info_email, company_logo, founder_id, role, equity]);
        res.json(response.rows[0]);
        console.log('Role Added');
    } catch (err) {
        console.error(err.message);
    }
});

//ADD FOUNDER//

router.put("/founder", auth, async (req, res, next) => {
    try {
        const { founder_id, company_id, role, equity } = req.body;
        const response = await pool.query(`INSERT INTO founders_company (
            founder_id,
            company_id,
            role,
            equity)
        VALUES (
            $1,
            $2,
            $3,
            $4
        )`, [founder_id, company_id, role, equity]);
        res.json(response.rows);
        console.log('Role Added');
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE//

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query("DELETE FROM companies WHERE company_id = $1 RETURNING company_id", [id]);
        res.json(response.rows[0].company_id);
    } catch (err) {
        
    }
});

module.exports = router;