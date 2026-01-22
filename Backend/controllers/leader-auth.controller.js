import db from "../databases/aware_vote.database.js";
import jsonwebtoken from 'jsonwebtoken'

const verification = async (req, res) => {
  try {
    // Text data
    const {
      name,
      mail,
      address,
      curr_pos,
      constituency,
      electing_for,
      party,
    } = req.body;
    console.log(mail);

    const files = req.files;

    if (!files || files.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Required documents missing",
      });
    }

    // Map files by order
    const [
      aadhaar_card,
      voter_id,
      party_ticket,
      affidavit,
      education_certificates,
      social_work,
    ] = files.map((file) => file.path);

    // Insert into PostgreSQL
    const query = `
      INSERT INTO pending_verification (
        name,
        mail,
        address,
        curr_pos,
        constituency,
        electing_for,
        party,
        aadhar_card,
        voter_id,
        party_ticket,
        affidavit,
        education_certificates,
        social_work,
        submitted_at,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, $14, $15)
    `;

    const values = [
      name,
      mail,
      address,
      curr_pos,
      constituency,
      electing_for,
      party,
      aadhaar_card,
      voter_id,
      party_ticket || null,
      affidavit,
      education_certificates || null,
      social_work || null,
      new Date().getDate(),
      "pending"
    ];

    const result = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Verification submitted successfully",
    });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

export default verification;


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

export { verification, login, validate};

