import db from "../db.js";
import { nanoid } from "nanoid";

import newUrlSchema from "../schemas/newUrlSchema.js"

export async function shortenURL(req, res) {
    const url = newUrlSchema.validate(req.body);

    if (url.error) {
        return res.status(422).send(url.error.message);
    }

    const shortUrl = nanoid(10).toLocaleLowerCase();

    try {
        await db.query(
            `
                INSERT INTO urls ("userId", "shortURL", url)
                VALUES ($1, $2, $3)
            `, [res.locals.user.id, shortUrl, req.body.url]
            );
        res.status(201).send({"shortUrl":shortUrl})
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

}

export async function getUrlById(req, res) {
    const {id} = req.params;

    try {
        const shortURL = await db.query(`
            SELECT id, "shortURL", url FROM urls WHERE id=$1
        `, [id]);

        return shortURL.rows.length <= 0
        ? res.sendStatus(404)
        : res.status(200).send(shortURL.rows[0]);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
}