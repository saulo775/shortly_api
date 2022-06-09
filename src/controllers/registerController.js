import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";

const saltRounds = 10;

export async function saveNewUser(req, res) {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);

    try {
        await db.query(
            `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
            `,[name, email, hash]
        );

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`
            SELECT * FROM users WHERE email=$1
        `, [ email ]);

        if (user.rows.length> 0 && bcrypt.compareSync(password, user.rows[0].password)) {
            const token = uuid();

            await db.query(`INSERT INTO sessions (token, "userId")
                VALUES ($1, $2)
            `, [token, user.rows[0].id]);

            return res.status(200).send(token);
        }else{
            return res.sendStatus(401);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}