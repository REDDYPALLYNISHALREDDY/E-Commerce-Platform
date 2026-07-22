import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getOrders } from "../services/order.service";

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const data = await getOrders();

            setOrders(data.orders);

        }

        catch {

            toast.error("Failed to load orders");

        }

    };

    return (

        <div className="max-w-7xl mx-auto py-10 px-5">

            <h1 className="text-4xl font-bold mb-8">

                Manage Orders

            </h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-blue-700 text-white">

                        <tr>

                            <th className="p-4">Customer</th>

                            <th>Total</th>

                            <th>Payment</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order => (

                                <tr
                                    key={order._id}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {order.user?.name}

                                    </td>

                                    <td>

                                        ₹ {order.totalPrice}

                                    </td>

                                    <td>

                                        {order.paymentMethod}

                                    </td>

                                    <td>

                                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                                            {order.orderStatus}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ManageOrders;