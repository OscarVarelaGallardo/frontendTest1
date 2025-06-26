
import train from '../assets/icons/train.svg';
import circleBlue from '../assets/icons/circle-blue.svg';
import circleGray from '../assets/icons/circle-gray.svg';
import truck from '../assets/icons/truck.svg';
import locationIcon from '../assets/icons/location.svg';
import eyeIcon from '../assets/icons/eye.svg';
import fullTruck from '../assets/icons/full-truck.svg'
import line from '../assets/icons/line.svg';
import { useEffect } from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import { formatedDate, formattedHours } from '../helpers/index';
type OrderProps = {
    orders: {
        orders: Array<{
            order_number: string;
            type: string;
            destinations: Array<{
                address: string;
                start_date: string;
                end_date: string;
            }>;
            status_string: string;
        }>;
    };
};
const Order = (orders: OrderProps['orders']) => {
    const navigate = useNavigate();
    const handleButtonClick = (order_number: string) => {
        navigate('/details/' + order_number);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            orders.orders.forEach(order => {
                const remainingTime = getRemainingTime(order.destinations[0]?.start_date);
                if (remainingTime <= 0) {
                    clearInterval(interval);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [orders.orders]);

    const getRemainingTime = (startDate: string) => {
        const start = new Date(startDate);
        const now = new Date();
        const diff = start.getTime() - now.getTime();
        return Math.max(0, diff);

    };


    const validateTimeToPickUp = (startDate: string) => {
        const start = new Date(startDate);
        const now = new Date();
        // console.log(start,now, start.getTime()>now.getTime())
        return start.getTime() > now.getTime();
    };

    if (!orders || !orders.orders) {
        return <p>No orders available</p>;
    }
    return (

        <>
            {orders.orders.map((order, index: number) => (
                <div key={index}>
                    <p className='order-page-title'> Order
                        <span className='order-page-title-number'>
                            #{order.order_number}
                        </span>
                    </p>
                    <div className='order-page-card'>

                        {/* Header Section */}
                        <div className='order-page-card-header'>
                            <div className='order-page-card-header-left'>
                                {
                                    order.status_string === 'Orden Asignada' ? (
                                        <img src={train} alt="Train Icon" className='order-page-card-header-icon' />
                                    ) : (
                                        <img src={fullTruck} alt="Train Icon" className='order-page-card-header-icon' />
                                    )

                                }
                                <p className='order-page-card-header-text'>
                                    {order.type}
                                </p>
                            </div>
                            <div className='order-page-card-header-right'>
                                {order.status_string === 'Orden Asignada' ? (
                                    <>
                                        <img src={circleGray} alt="Circle Gray Icon" className='order-page-card-header-icon' />

                                        <p>
                                            Assigned
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img src={circleBlue} alt="Circle Blue Icon" className='order-page-card-header-icon' />
                                        <p>
                                            In Transit
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <hr className='order-page-card-divider'></hr>
                        {/* Order Details Section */}

                        <div className='order-page-card-content'>


                            <div className='order-page-card-icons'>
                                <img src={truck} alt="Truck Icon"
                                    style={{ width: '34px', height: '34px' }}
                                    className='order-page-card-truck-icon' />
                                <img src={line} alt="Line Icon" className='order-page-card-line-icon' />
                                <img src={locationIcon} alt="Location Icon" style={{ width: '34px', height: '34px' }} className='order-page-card-truck-icon' />
                            </div>
                            <div className='order-page-card-details'>
                                <p className='order-page-card-title'>
                                    <span className='order-page-card-shadow'>PICKUP</span>
                                    {order.destinations[0]?.address.split(',')[2].split(' ')[2] + "," + order.destinations[1]?.address.split(',')[4] || 'Unknown Location'}
                                    <span className='order-page-card-shadow'>
                                        {
                                            order.destinations[0]?.address || 'Unknown Location'
                                        }
                                    </span>
                                </p>
                                <p className='order-page-card-title'>
                                    <span className='order-page-card-shadow'>DROPOFF</span>

                                    {
                                        order.destinations[1]?.address.split(',')[1].split(' ')[1] + " " + order.destinations[1]?.address.split(',')[1].split(' ')[2] + "," +
                                        order.destinations[1]?.address.split(',')[4] || 'Unknown Location'}

                                    <span className='order-page-card-shadow'>
                                        {
                                            order.destinations[1]?.address || 'Unknown Location'

                                        }
                                    </span>
                                </p>

                            </div>
                            <div className='order-page-card-date-time'>
                                <p className='order-page-card-date'>
                                    {formatedDate(order.destinations[0]?.start_date) || 'Unknown Date'}
                                    <br />
                                    <span>
                                        {formattedHours(order.destinations[0]?.start_date) || 'Unknown Time'}
                                    </span>
                                </p>
                                <p className='order-page-card-hour'>

                                </p>
                                <p className='order-page-card-date'>
                                    {formatedDate(order.destinations[0]?.end_date) || 'Unknown Date'}
                                    <br />
                                    <span>
                                        {formattedHours(order.destinations[0]?.end_date) || 'Unknown Time'}
                                    </span>
                                </p>
                             
                            </div>

                            </div>
                            <div className='order-page-card-buttons'>


                                {

                                    order.status_string === 'Orden Asignada' ?
                                        <div className='order-page-card-button-primary-disabled'>

                                        </div> :
                                        <>
                                            {validateTimeToPickUp(order.destinations[0]?.start_date) ?

                                                <button className='order-page-card-button-primary'>
                                                    <p className='order-page-card-button-primary-text'>
                                                        Start to pickup in <span className='order-page-card-button-primary-time'>
                                                            {Math.ceil(getRemainingTime(order.destinations[0]?.start_date) / 1000 / 60)}
                                                        </span> minutes
                                                    </p>
                                                </button> :
                                                <button className='order-page-card-button-secondary'>

                                                    Is time to pickup

                                                </button>
                                            }

                                        </>
                                }





                                <button className='order-page-card-button-secondary'
                                    onClick={() => handleButtonClick(order.order_number)}
                                >
                                    Resumen
                                    <img src={eyeIcon} alt="Eye Icon" className='order-page-card-button-icon' />

                                </button>
                            </div>

                        </div>

                   
                </div>
            ))}

        </>

    )
}

export default Order