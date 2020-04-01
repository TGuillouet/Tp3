import express from "express";
import { Client } from "pg";
import cors from "cors";

const client = new Client({
    host: "db",
    database: "postgres",
    user: "root",
    password: "myPass"
});

client.connect().then(() => {
    console.log("Connected to the database");
})
.catch((error) => {
    console.log("Error", error);
    
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

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("asd");
});

// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});