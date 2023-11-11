import { useState, useEffect } from 'react';
import socketIo from 'socket.io-client';
import './styles.css';

interface IOrder {
    _id: string;
    table: string;
    description: string;
    status: 'PENDING' | 'PREPARING' | 'DONE';
}
const socket = socketIo('http://localhost:3001', {
    transports: ['websocket'],
});

export default function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/orders')
            .then((res) => res.json())
            .then(setOrders);

        !socket.hasListeners('newOrder') &&
            socket.on('newOrder', (order) => {
                setOrders((prevState) => [...prevState, order]);
            });
        !socket.hasListeners('statusChange') &&
            socket.on('statusChange', (updatedOrder) => {
                setOrders((prevState) => prevState.map((order) => order._id === updatedOrder._id ? updatedOrder : order));
            });
    }, []);

    function handleStatusChange(status: string, order: IOrder) {
        fetch(`http://localhost:3001/orders/${order._id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
    }

    return (
        <div className='OrderContainer'>
            {orders.map((order) => (
                <div className={`OrderCard ${order.status}`} key={order._id}>
                    <header>
                        <h3>Pedido <strong>#{order._id.substr(0, 15)} </strong></h3>
                        <small>MESA #{order.table} </small>
                    </header>
                    <p> {order.description} </p>
                    <select value={order.status} onChange={({ target: { value } }) => handleStatusChange(value, order)}>
                        <option value="PENDING" > Pendente </option>
                        <option value="PREPARING" > Preparando </option>
                        <option value="DONE" > Finalizado </option>
                    </select>
                </div>
            ))}
        </div>
    );
}