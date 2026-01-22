import db from '../databases/aware_vote.database.js';

const allSearch = async (req, res) => {
  const val = req.body.value;

  try {
    const result = await db.query(
      `
      SELECT * 
      FROM leaders_data
      WHERE name ILIKE $1
         OR constituency_code::TEXT ILIKE $1
      LIMIT 5
      `,
      [`%${val}%`]
    );

    return res.status(200).json({ filtered_leaders: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Search failed" });
  }
};

const nameSearch = async (req, res) =>{
    const val = req.body.value;
    try{
        const result = await db.query('SELECT * FROM leaders_data where name ILIKE $1 LIMIT 5', [`%${val}%`])
        return res.status(200).json({filtered_leaders: result.rows} );
    }
    catch(err){
        
    }
}
const citySearch = async (req, res) =>{
    const val = req.body.value;
    try{

    }
    catch(err){
        
    }
}
const distSearch = async (req, res) =>{
    const val = req.body.value;
    try{
        const res = await db.query('SELECT * FROM leaders_data LIMIT 5')
        return res.status(200).json({leaders: res.rows} );
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:'Internal server error'});
    }
}
const sampleSearch = async (req, res) =>{
    
   try{
        const result = await db.query('SELECT * FROM leaders_data LIMIT 5')
        return res.status(200).json({sampleLeaders: result.rows} );
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:'Internal server error'});
    }
}

const getLeaderById = async (req, res) =>{
    
   try{
        const result = await db.query('SELECT * FROM leaders_data where id=$1', [req.body.id])
        const comment = await db.query('SELECT * FROM comments where id=$1', [req.body.id])
        console.log(result.rows[0]);
        return res.status(200).json({leader: result.rows[0], comments:comment.rows[0]});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:'Internal server error'});
    }
}
const postComment = async (req, res) => {
    const { leaderId, comment } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO comments (leader_id, comment, date) VALUES ($1, $2, $3) RETURNING *',
            [leaderId, comment, new Date().toLocaleDateString()]
        );
        return res.status(200).json({ comments: (result.rows) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export {allSearch, nameSearch, citySearch, distSearch, sampleSearch, getLeaderById, postComment};