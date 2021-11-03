import express from 'express';
import router from './routes/router';
import { intializeDB } from './db';
import cors from 'cors';
const host = process.env.DBHOST || "localhost";
const username = process.env.DBUSERNAME || "postgres";
const password =  process.env.DBPASSWORD || "admin";
const database =  process.env.DBDATABASE ||"ERP_DB";
intializeDB(host,username,password,database);
const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors())
app.use('/',router);

app.listen(3000,() =>{
    console.log('server running');
});