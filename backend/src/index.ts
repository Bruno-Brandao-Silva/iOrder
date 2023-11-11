import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import router from './routes';
import { Server } from 'socket.io';

mongoose.connect('mongodb://127.0.0.1:27017/iorders');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(bodyParser.json());
app.use((req: any, res: Response, next) => {
    req.io = io;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(router);

server.listen(3001, () => console.log('Server started at https://localhost:3001'));
