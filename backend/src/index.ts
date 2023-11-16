import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import router from './routes';
import { Server } from 'socket.io';
import dgram from 'dgram';

mongoose.connect('mongodb://mongodb:27017/iorders');

const PORT = 3001;
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


const udpServer = dgram.createSocket('udp4');
udpServer.bind(3002);
udpServer.on('message', (msg, rinfo) => {

    console.log(`[Backend] Received message from ${rinfo.address}:${rinfo.port} : ${msg}`);
    if (msg.toString() === 'iOrder[Mobile]') {
        const responseData = `iOrder[Backend]`;
        udpServer.send(responseData, rinfo.port, rinfo.address);
    }
});

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));