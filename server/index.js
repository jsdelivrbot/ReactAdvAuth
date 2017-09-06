import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import cors from 'cors';

import { mongoURI } from './config/keys';

//Db Setup
mongoose.connect(mongoURI)


//app setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);
 

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);