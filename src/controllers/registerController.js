import db from "../db.js"

export async function saveNewUser(req, res) {
    const user = req.body;
    const teste  = await db.query("SELECT * FROM USERS");
    console.log(teste.rows);
    res.send(user);
}