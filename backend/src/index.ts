import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import router from './routes';
import { Server } from 'socket.io';
import dgram from 'dgram';

mongoose.connect('mongodb://127.0.0.1:27017/iorders');
// mongoose.connect('mongodb://mongodb:27017/iorders');

const PORT = (process.env.PORT || 3001) as number;
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

server.listen(PORT, () => console.log(`Server started at https://localhost:${PORT}`));

const udpServer = dgram.createSocket('udp4');
udpServer.bind(3002);
udpServer.on('message', (msg, rinfo) => {

    console.log(`[Backend] Received message from ${rinfo.address}:${rinfo.port} : ${msg}`)
        ;
    if (msg.toString() === 'iOrder[Mobile]') {
        const responseData = `iOrder[Backend]`;
        udpServer.send(responseData, rinfo.port, rinfo.address);
    }
});
