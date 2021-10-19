import express from 'express';
import router from './routes/router';
import { intializeDB } from './db';
intializeDB();
const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use('/',router);

app.listen(3000,() =>{
    console.log('server running');
});