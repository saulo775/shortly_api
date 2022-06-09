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