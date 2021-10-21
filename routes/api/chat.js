const express = require('express');
const router = express.Router();
const { pool } = require("../../dbConfig");

//get chat information//

router.get("/:reciever_id", async (req, res, next) => {
 
    try {
        let { reciever_id } = req.params;
        const response = await pool.query(`SELECT 
            c.chat_id,
            (SELECT CONCAT(f.founder_first_name,' ',f.founder_last_name) as sender_name FROM founders f WHERE c.sender_id = f.founder_id and c.chat_id = c.chat_id),
            (SELECT CONCAT(f.founder_first_name,' ',f.founder_last_name) as reciever_name FROM founders f WHERE c.reciever_id = f.founder_id and c.chat_id = c.chat_id),
            c.chat_message,
            c.message_timestamp,
            c.message_read
        FROM chat c
        LEFT JOIN founders f ON c.reciever_id = f.founder_id
        WHERE c.reciever_id = $1 or c.sender_id = $1;`, [reciever_id]);
        res.json(response.rows);
        console.log('success');
    } catch (err) {
        console.error(err.message);
    }
});

//get chat information//

router.put("/", async (req, res, next) => {
 
    try {
        let { reciever_id, sender_id, chat_message } = req.body;
        const response = await pool.query(`INSERT INTO chat (
            sender_id,
            reciever_id,
            chat_message,
            message_timestamp,
            message_read)
        VALUES (
            $1,
            $2,
            $3,
            CURRENT_TIMESTAMP,
            false
        )`, [sender_id, reciever_id, chat_message]);
        res.json(response.rows);
        console.log('message added');
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;