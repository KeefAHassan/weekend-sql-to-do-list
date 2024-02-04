const router = require('express').Router();
const pool = require('../modules/pool');

// this endpoint is used for getting all todo
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "id";`;

    // need to send the query to the database

    pool.query(queryText)
        .then(
            (result) => {
                let todos = result.rows;

                //Send them back to the client
                res.send(todos);
            }
        )
        .catch(
            (error) => {
                console.log(`Error making query ${queryText}`, error);
                res.sendStatus(500);
            }
        );
})


// this endpoint is used for creating a new todo
router.post('/', (req, res) => {
    let newTodo = req.body;


    let queryText = `
    INSERT INTO "todos" ("text")
    VALUES
    ($1)
    ;`

    //Need to pass the query into the pool, along with a second parameter
    // The second parameter is the list of things we want pg to safely put into the template

    pool.query(queryText, [newTodo.text])
        .then(
            (result) => {
                console.log(`this post query worked, ${queryText}`, result);
                res.sendStatus(201);
            }
        )
        .catch(
            (error) => {
                console.log(`this post query failed, ${queryText}`, error);
                res.sendStatus(500)
            }
        );

})


// this endpoint is used marking  a todo as complete
router.put('/:id', (req, res) => { 
    const todoId = req.params.id;

    const sqlQuery = `UPDATE "todos" SET "isComplete" = true WHERE id=$1;`;

    pool.query(sqlQuery, [todoId])
        .then(
            (result) => {
                console.log(`Update query worked! ${sqlQuery}`, result);
                res.sendStatus(200);
            }
        )
        .catch (
            (error) => {
                console.log(`Update query failed, ${sqlQuery}`, error);
                res.sendStatus(400);
            }
        );
})


// this endpoint is used for delete a todo
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `DELETE FROM "todos" WHERE "id" = $1`;
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(204);
    }).catch(error => {
        console.log(`Error in DELETE with querytext ${queryText}`, error);
        res.sendStatus(500);
    });
 })

module.exports = router;
