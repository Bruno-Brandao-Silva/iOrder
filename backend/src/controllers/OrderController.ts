import Order from '../models/Order';
import { Request, Response } from 'express';


export async function index(req: Request, res: Response) {
    const orders = await Order.find();
    res.json(orders);
}

export async function store(req: any, res: Response) {
    const { table, description } = req.body;

    if (!table || !description) {
        return res.sendStatus(400);
    }

    const order = await Order.create({
        table, description,
    });

    req.io.emit('newOrder', order);
    res.json(order);
}
export async function update(req: any, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.sendStatus(400);
    }

    const order = await Order.findByIdAndUpdate(
        { _id: id },
        { status },
        { new: true },
    );

    req.io.emit('statusChange', order);
    res.json(order);
}
