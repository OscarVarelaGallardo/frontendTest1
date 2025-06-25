
import train from '../assets/icons/train.svg';
import circleBlue from '../assets/icons/circle-blue.svg';
import truck from '../assets/icons/truck.svg';
import locationIcon from '../assets/icons/location.svg';
import eyeIcon from '../assets/icons/eye.svg';

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
        }>;
    };
};
const Order = (
    orders: OrderProps['orders'],
) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/details');
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
                                <img src={train} alt="Train Icon" className='order-page-card-header-icon' />
                                <p className='order-page-card-header-text'>
                                    {order.type}
                                </p>
                            </div>
                            <div className='order-page-card-header-right'>
                                <img src={circleBlue} alt="Circle Icon" className='' />
                                <span className='order-page-card-header-circle-text'>
                                    In Transit</span>
                            </div>
                        </div>
                        <hr className='order-page-card-divider'></hr>
                        {/* Order Details Section */}
                        <div className='order-page-card-content'>
                            <div className='order-page-card-info'>
                                <img src={truck} alt="Truck Icon"
                                    style={{
                                        width: '24px', height: '24px'
                                    }}
                                    className='order-page-card-truck-icon' />
                                <div className='order-page-card-details'>


                                    <p className='order-page-card-title'>
                                        <span className='order-page-card-shadow'>PICKUP</span>
                                        New York
                                        <span className='order-page-card-shadow'>
                                            {
                                                order.destinations[0]?.address || 'Unknown Location'
                                            }
                                        </span>
                                    </p>

                                </div>
                                <div className='order-page-card-date-time'>
                                    <p className='order-page-card-date'>
                                        {formatedDate(order.destinations[0]?.start_date) || 'Unknown Date'}
                                    </p>
                                    <p className='order-page-card-hour'>
                                        {formattedHours(order.destinations[0]?.start_date) || 'Unknown Time'}
                                    </p>
                                </div>
                            </div>
                            <div className='order-page-card-info'>
                                <img src={locationIcon} alt="Location Icon" style={{ width: '24px', height: '24px' }} className='order-page-card-truck-icon' >
                                </img>
                                <div className='order-page-card-details'>
                                    <p className='order-page-card-title'>
                                        <span className='order-page-card-shadow'>DROPOFF</span>
                                        New York</p>
                              
                                        {order.destinations.map((destination, destIdx) => (
                                            <span className='order-page-card-shadow' key={destIdx}>
                                                {destination.address || 'Unknown Location'}
                                            </span>
                                        ))}
                                 

                                </div>
                                <div className='order-page-card-date-time'>
                                    <p className='order-page-card-date'>
                                        {formatedDate(order.destinations[0]?.end_date) || 'Unknown Date'}
                                    </p>
                                    <p className='order-page-card-hour'>
                                        {formattedHours(order.destinations[0]?.end_date) || 'Unknown Time'}
                                    </p>

                                </div>

                            </div>


                            <div className='order-page-card-buttons'>
                                <button className='order-page-card-button-primary'>Its time to pick up</button>
                                <button className='order-page-card-button-secondary'
                                    onClick={handleButtonClick}>
                                    Resumen
                                    <img src={eyeIcon} alt="Eye Icon" className='order-page-card-button-icon' />

                                </button>
                            </div>

                        </div>

                    </div >
                </div>
            ))}

        </>

    )
}

export default Order