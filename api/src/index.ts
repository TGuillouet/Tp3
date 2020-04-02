import express from "express";
import { getSecret } from "./secrets";
import { Client } from "pg";
import cors from "cors";

const client = new Client({
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
        "OPTIONS"
    ]
}
app.use(cors(corsOptions));

app.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const rows = await client.query("SELECT * FROM users");
        
        console.log(rows);
        
        res.status(200).send("asd");
    } catch(e) {
        next(e);
    }
});

app.use((err: express.Errback, req: express.Request, res: express.Response) => {
    console.error(err);
    res.status(500).json({ error: err });
});

// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    client.connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.log("Error", error); 
    });
});