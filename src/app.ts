import express from 'express';
import router from './routes/router';
import { intializeDB } from './db';
import cors from 'cors';
const host = process.env.HOST || "localhost";
const username = process.env.USERNAME || "postgres";
const password =  process.env.PASSWORD || "admin";
const database =  process.env.DATABASE ||"ERP_DB";
intializeDB(host,username,password,database);
const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors())
app.use('/',router);

app.listen(3000,() =>{
    console.log('server running');
});