const router = require('express').Router();
const pool = require('../modules/pool');

// this endpoint is used for getting all todo
router.get('/', (req, res) => { 
    let queryText = `SELECT * FROM "todos" ORDER BY "id";`;

    // need to send the query to the database

    pool.query(queryText)
        .then (
            (result) => {
            let todos = result.rows;

            //Send them back to the client
            res.send(todos);
            }
        )
        .catch(
            (error) =>{
                console.log(`Error making query ${queryText}`, error);
                res.sendStatus(500);
            }
        );
})


// this endpoint is used for creating a new todo
router.post('/', (req, res) => {})


// this endpoint is used marking  a todo as complete
router.put('/', (req, res) => {})


// this endpoint is used for delete a todo
router.delete('/', (req, res) => {})

module.exports = router;
