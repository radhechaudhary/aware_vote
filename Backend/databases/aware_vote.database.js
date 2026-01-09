import pg from 'pg'

const db=new pg.Client({ // connection to database
    user:"postgres",
    database:"aware_vote",
    port:5432,
    host:"localhost",
    password:"Radhe@1234"
});
db.connect();

export default db;