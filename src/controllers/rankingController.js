import db from "../db.js";

export async function getRanking(req, res) {
    try {
        const teste = await db.query(`
            SELECT 
                usr.id, 
                usr.name, 
                COUNT (r.id) AS "linksCount",
                SUM(COALESCE(R."visitCount", 0)) AS "visitCount"
            FROM users usr
            LEFT JOIN urls R ON  usr.id=R."userId"
            GROUP BY usr.id, usr.name
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);
        res.stauts(200).send(teste.rows)
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}