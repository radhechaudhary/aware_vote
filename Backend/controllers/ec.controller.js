import db from '../databases/aware_vote.database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const login = async (req, res) => {
    const { id, password } = req.body;
    try {
        const data = await db.query('SELECT * FROM admin where admin_id=$1', [id]);
        // const isMatch = await bcrypt.compare(password, data.rows[0].password);
        const isMatch = password === data.rows[0].password;
        if (isMatch) {
            const secretKey = 'jefhd85o3ruijf9'
            var token = jsonwebtoken.sign({ id: id, role: 'admin' }, secretKey)
            res.cookie('ecAuthToken', token, {
                httpOnly: true,
                secure: true,    // true only for HTTPS
                sameSite: 'none', // 👈 allows cross-site cookies
                path: '/',
            });
            res.status(200).json({ success: true })
        }
        else {
            res.status(300).json({ success: false })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const validate = (req, res) => {

    const token = req.cookies.ecAuthToken;
    const secretKey = 'jefhd85o3ruijf9';
    if (!token) return res.status(403).json({
        msg: "No token present"
    });
    try {
        const decoded = jsonwebtoken.verify(token, secretKey);
        console.log(decoded.role)
        if (decoded.role !== 'admin') {
            return res.status(401).json({
                valid: false
            });
        }
    } catch (err) {
        return res.status(401).json({
            valid: null
        });
    }
    res.status(200).json({ valid: true });
};

const submissions = async (req, res) => {

    const token = req.cookies.ecAuthToken;
    const secretKey = 'jefhd85o3ruijf9';
    if (!token) return res.status(403).json({
        msg: "No token present"
    });
    try {
        const decoded = jsonwebtoken.verify(token, secretKey);
        if (decoded.role !== 'admin') {
            res.status(404)
        }
        else {
            const data = await db.query('SELECT * FROM pending_verification');
            console.log(data.rows)
            res.json({ submissions: data.rows });
        }
    } catch (err) {
        return res.status(401).json({
            valid: null
        });
    }
};
const createCommunity = async (req, res) => {
    const { name, language, description, image } = req.body;
    console.log(name)
    await db.query('INSERT INTO communities (name, language, description, image) VALUES ($1, $2, $3, $4)', [name, language, description, image]);
    res.status(201).json({ message: 'Community created successfully' });
}
export { login, validate, submissions, createCommunity };