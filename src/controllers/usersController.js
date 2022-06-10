import db from "../db.js";

export async function getAllUrlsUser(req, res) {
    const { id } = req.params;

    try {
        const user = await db.query(`
            SELECT usr.id, usr.name, SUM(COALESCE(r."visitCount",0)) AS "visitCount"
            FROM users usr
            LEFT JOIN urls r ON usr.id = r."userId"
            WHERE usr.id = $1
            GROUP BY usr.id, usr.name`, [id] 
        );

        if (user.rows.length <= 0) {
            return res.sendStatus(404);
        }

        const shortUrls = await db.query(`
            SELECT id, "shortURL", url, "visitCount"
            FROM urls 
            WHERE "userId"=$1
            ORDER BY id
        `, [id])

        const result = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: user.rows[0].visitCount,
            shortenedUrls: shortUrls.rows
        } 

        res.status(200).send(result)
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}