import db from "../db.js";

async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if (!token) {
        return res.status(401).send("Você precisa logar para continuar!");
    }

    try {
        const session = await db.query(
            `SELECT * FROM sessions WHERE token=$1`, [token]
        );

        if (session.rows.length <=0) {
            return res.status(401).send("Você precisa logar para continuar!");
        }

        if (session.rows[0].isActive === false) {
            return res.status(401).send("Usuário precisa logar novamente!");
        }

        const user = await db.query(
            `SELECT id, name, email, "createdAt" FROM users WHERE id=$1`, [session.rows[0].userId]
        );

        if (user.rows.length <= 0) {
            return res.status(401).send("Login Inválido!");
        }

        res.locals.user = user.rows[0];
        res.locals.token = session.rows[0].token;

        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}

export default authMiddleware