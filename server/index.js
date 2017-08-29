import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';

//Db Setup
mongoose.connect('mongodb://127.0.0.1/react-auth', {useMongoClient: true})


//app setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);
 

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);