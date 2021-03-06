import express from "express";
import { getSecret } from "./secrets";
import { Client, Pool } from "pg";
import cors from "cors";
import SqlString from "sqlstring";
import bodyParser from "body-parser";

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE_NAME,
    user: getSecret("POSTGRES_USER"),
    password: getSecret("POSTGRES_PASSWORD")
});

const app = express();
const corsOptions: cors.CorsOptions = {
    origin: [
      "http://localhost:3001"
    ],
    methods: [
        "GET",
        "POST",
        "DELETE",
        "OPTIONS"
    ]
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.route("/users")
    .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const client = await pool.connect();
        try {
            const rows = await client.query(SqlString.format("SELECT * FROM users", []));
            res.status(200).json({ rows: rows.rows });
        } catch(e) {
            next(e);
        } finally {
            client.release();
        }
    })
    .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const client = await pool.connect();
        try {
            const rows = await client.query(SqlString.format("INSERT INTO users VALUES (nextVal('userid'), ?)", [ req.body.username ]));
            res.status(200).json({ success: true });
        } catch(e) {
            next(e);
        } finally {
            client.release();
        }
    });
    
app.route("/users/:id")
    .delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const client = await pool.connect();
        try {
            await client.query(SqlString.format("DELETE FROM users WHERE id = ?", [ req.params.id ]));
            res.status(200).json({ success: true });
        } catch(e) {
            next(e);
        } finally {
            client.release();
        }
    });


app.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err);
    
    res.status(500).json({ error: err });
});

// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});