import express from "express";
import { connect } from "./database/Database.js";
import { configDotenv } from "dotenv";
import cors from 'cors';
import UserRouter from './routes/UserRoute.js';
import MailRouter from './routes/EmailRoute.js';

configDotenv();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/auth/user/', UserRouter);
app.use('/mail/user/', MailRouter)

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

app.listen(8000, () => { connect();console.log('Server is Running at 8000')});