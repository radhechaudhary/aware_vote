import db from "../databases/aware_vote.database.js";
import jsonwebtoken from 'jsonwebtoken'

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
    try{
        const data = await db.query('INSERT INTO leader_login_credential values($1, $2)',[email, password]);
        const secretKey = 'jefhd85o3ruijf9'
        var token = jsonwebtoken.sign({role:'leader', email:email}, secretKey)
        res.cookie('leaderAuthToken', token, {
            httpOnly: true,
            secure: true,    // true only for HTTPS
            sameSite: 'none', // 👈 allows cross-site cookies
            path: '/',
        });
        res.status(200).json({success:true})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Username already exists'})
    }
  res.status(200).json({ message: "Signup successful" });
};

const login =  async (req, res) => {
  const { email, password } = req.body;
    try{
        const data = await db.query('SELECT * FROM leader_login_credential where email=$1',[email]);
        // const isMatch = await bcrypt.compare(password, data.rows[0].password);
        const isMatch = password === data.rows[0].password;
        if(isMatch){
            const secretKey = 'jefhd85o3ruijf9'
            var token = jsonwebtoken.sign({role:'leader', email:email}, secretKey)
            res.cookie('leaderAuthToken', token, {
                httpOnly: true,
                secure: true,    // true only for HTTPS
                sameSite: 'none', // 👈 allows cross-site cookies
                path: '/',
            });
            res.status(200).json({success:true})
        }
        else{
            res.status(300).json({error:'wrong passowrd'})
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }
};

const validate =  (req, res) => { 
    const token = req.cookies.leaderAuthToken;
    const secretKey = 'jefhd85o3ruijf9';
    if (!token) return res.status(403).json({  
        msg: "No token present" 
    }); 
    try { 
        const decoded = jsonwebtoken.verify(token, secretKey); 
        if(decoded.role !== 'leader'){
            return res.status(401).json({  
                valid:false
            }); 
        }
    } catch (err) { 
        return res.status(401).json({  
            valid:null
        }); 
    } 
    res.status(200).json({valid:true}); 
}; 

export { signup, login, validate };

