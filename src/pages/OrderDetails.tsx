import carYellow from '../assets/icons/car-yellow.svg';
import iconBack from '../assets/icons/icon-back.svg';
import bell from '../assets/icons/bell.svg';
import circleBlue from '../assets/icons/circle-blue.svg';
import circleGray from '../assets/icons/circle-gray.svg';
import circleEmpty from '../assets/icons/circle-empty.svg';
import line from '../assets/icons/line.svg'
import checked from '../assets/icons/cheked.svg';
import unchecked from '../assets/icons/unchecked.svg';
import userPhoto from '../assets/img/user.png';
import arrowUp from '../assets/icons/arrow-up.svg';
import { getAllOrders } from '../api/index';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderDetails.css';
import { useEffect, useState } from 'react';

//Define types for order details
type OrderDetailsDTO = {
    _id: string;
    order_number: string;
    destinations: Array<{
        address: string;
    }>;
    user?: {
        photo?: string;
    };
    status: number;
    end_date?: string;
    phone?: string;
    email?: string;

};

const OrderDetails = () => {
    const [orders, setOrders] = useState<OrderDetailsDTO[]>([]);
    const [numberOrder, setNumberOrder] = useState('');
    const [orderDetails, setOrderDetails] = useState<OrderDetailsDTO[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    const { orderId } = useParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getAllOrders();
                setOrders(response.result);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        if (orderId) {
            setNumberOrder(orderId);

            fetchOrderDetails();
        }
    }, [orderId]);

    useEffect(() => {
        if (orders && numberOrder) {
            const foundOrder = filterOrderById(orders, numberOrder);
            if (foundOrder) {


                setOrderDetails(foundOrder);
            } else {
                console.error(`Order with ID ${numberOrder} not found`);
            }
        }
    }, [orders, numberOrder]);
    const handleShowDetails = () => {
        setShowDetails(!showDetails);

    }
    const filterOrderById = (ordersList: OrderDetailsDTO[], id: string) => {
        return ordersList
            .filter(order => order.order_number?.toLowerCase() === id.toLowerCase())
            .map(order => ({
                ...order
            }));
    };

    return (

        <>
            <div className="order-details-container">
                <div className="order-details-header">
                    <img src={iconBack} onClick={() => navigate('/')} alt="Back Icon" />
                    <h2 className="order-details-title">Cargo Details</h2>
                    <img src={bell} alt="Bell Icon" />
                </div>
                {orderDetails && (
                    orderDetails.map((orderDetails) => (
                        <div className="order-details-card" key={orderDetails._id}>
                            <div className="order-details-card-header">
                                <p className="order-details-card-header-title">
                                    <span className="order-details-card-header-title-number">
                                        Referencia   {orderDetails._id || 'N/A'}
                                    </span>
                                    <br />
                                    Order Number # {orderDetails.order_number || 'N/A'}
                                </p>
                            </div>

                            <div className="order-details-body">
                                <div className="order-details-body-image">
                                    <img src={carYellow} alt="Car Yellow" />
                                    <img src={line} alt="line" className='line-separator' />
                                    <img src={circleEmpty} alt="Circle Empty" className="circle-drop" />
                                </div>

                                <div className="order-details-body-items">
                                    <p className="order-details-location">
                                        PICKUP <br />
                                        <span>
                                            {orderDetails?.destinations[0]?.address.split(',')[2].split(' ')[2] + "," + orderDetails?.destinations[1]?.address.split(',')[4] || 'Unknown Location'}
                                        </span><br />
                                        {orderDetails?.destinations[0]?.address || 'Unknown Address'}
                                    </p>

                                    <div className="order-details-status">
                                        <img src={circleBlue} alt="Circle Blue" className="order-details-circle-icon" />
                                        <p>Accepted</p>
                                    </div>

                                    <p className="order-details-location">
                                        DROPOFF <br />
                                        <span>{
                                            orderDetails?.destinations[1]?.address.split(',')[2].split(' ')[2] + "," + orderDetails?.destinations[1]?.address.split(',')[4] || 'Unknown Location'}

                                        </span><br />
                                        {orderDetails?.destinations[1]?.address || 'Unknown Address'}
                                    </p>

                                    <div className="order-details-status">
                                        <img src={circleGray} alt="Circle Gray" className="order-details-circle-icon" />
                                        <p>On hold</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))
                )}
                <div className="order-details-card-timeline" style={{ marginTop: '40px' }}>
                    <div className="order-details-tracking-header">
                        <img src={
                            orderDetails.length > 0 && orderDetails[0].user?.photo
                                ? orderDetails[0].user.photo
                                : userPhoto
                        } alt="User Icon" className="order-details-user-icon" />
                    </div>

                    <div className="order-details-tracking-time">
                        <p>{
                            ///current date
                            new Date().toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',

                            })

                        }</p>
                    </div>
                    {orderDetails && (
                        orderDetails.map((orderDetails, index) => (
                            <div key={index}>
                                <div className='order-details-tracking-status'  >
                                    <div className='order-details-tracking-status-item'  >
                                        <div className='circle-item' style={{ backgroundColor: orderDetails.status >= 1 ? '#FFEE00' : 'gray' }}>
                                            <img src={checked} alt="Checked Icon" className='checked-icon' />
                                        </div>
                                        <div className='circle-item' style={{ backgroundColor: orderDetails.status >= 2 ? '#FFEE00' : 'gray' }}>
                                            <img src={checked} alt="Checked Icon" className='checked-icon' />

                                        </div>
                                        <div className='circle-item' style={{ backgroundColor: orderDetails.status >= 3 ? '#FFEE00' : 'gray' }} >
                                            <img src={checked} alt="Checked Icon" className='checked-icon' />
                                        </div>
                                        <img src={unchecked} alt="Unchecked Icon" className='unchecked-icon' />
                                    </div>
                                    <div className='order-details-tracking-status-item-text'>
                                        <p className='order-details-tracking-status-item-text'
                                            style={{ color: orderDetails.status >= 1 ? '#FFEE00' : 'gray' }}>
                                            Created Order</p>
                                        <p className='order-details-tracking-status-item-text'
                                            style={{ color: orderDetails.status >= 2 ? '#FFEE00' : 'gray' }}>
                                            Accepted Order</p>
                                        <p className='order-details-tracking-status-item-text'
                                            style={{ color: orderDetails.status >= 3 ? '#FFEE00' : 'gray' }}>
                                            Pickup set up by User</p>
                                        <p className='order-details-tracking-status-item-text'
                                            style={{ color: orderDetails.status >= 4 ? '#FFEE00' : 'gray' }}>
                                            Pickup Completed</p>
                                    </div>

                                </div>

                                <div className='order-details-tracking-status-footer'>
                                    <p>Track Order</p>
                                </div>
                            </div>



                        ))
                    )}
                </div>
                <div className='order-details-pickData-button'style={{ marginTop: '20px' }}>
                    <p>Pickup Data</p>
                    <div onClick={handleShowDetails}>
                        <img src={arrowUp} alt="Arrow up" className='arrow-up' />
                    </div>

                </div>
                {showDetails && <div className='order-details-pickData-content'>
                    {orderDetails.map((order, index) => (
                        <div key={index} className='order-details-pickData-item'>

                            <p className='order-details-pickData-item-address'> {order.destinations[0]?.address || 'Unknown Address'}</p>
                            <p className='order-details-pickData-item-date'> {new Date(
                                order.end_date || new Date() 
                            ).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</p>
                            <p className='order-details-pickData-item-phone'> {order.phone || '+525567890346'}

                            </p>
                            <p className='order-details-pickData-item-email'> {order.email || 'johndoe@gmail.com'}</p>
                        </div>
                    ))}
                </div>}

            </div>



        </>
    )
}

export default OrderDetails