import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

import './configs/connection.js';
import { PORT } from './configs/server.config.js';

import UserRouter from './routes/user.router.js';
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user',UserRouter);

app.listen(PORT);
console.log(`server invoked to link http://localhost:${PORT}`);