import carYellow from '../assets/icons/car-yellow.svg';
import iconBack from '../assets/icons/icon-back.svg';
import bell from '../assets/icons/bell.svg';
import circleBlue from '../assets/icons/circle-blue.svg';
import circleGray from '../assets/icons/circle-gray.svg';
import circleEmpty from '../assets/icons/circle-empty.svg';

import { useNavigate } from 'react-router-dom';
import './OrderDetails.css';


const OrderDetails = () => {
    const navigate = useNavigate();
    return (

        <>
            <div className="orders-page-container-details">
                <div className="orders-page-header">
                    <img src={iconBack}
                        onClick={() => { navigate('/') }}
                        alt="Back Icon" className="back-icon" />
                    <h2 className="orders-page-title">
                        Cargo Details</h2>
                    <img src={bell} alt="Bell Icon" className="icon-bell" />
                </div>
                <div className='order-page-card'>
                    <div className='order-page-card-header'>
                        <p className='order-page-card-header-title'>
                            <span className='order-page-card-header-title-number'>
                                Referencia A1190</span>
                            <br />
                            Order Number #7804GNZ
                        </p>

                    </div>
                    <div className='order-page-card-body'>


                        <div className='order-page-card-body-image'>
                            <img src={carYellow} alt="Car Yellow" className='car-yellow' />

                            <img src={circleEmpty} alt="Circle Blue"

                                className='circle-empty' />


                        </div>
                        <div className='order-page-card-body-items'>
                            <p className='order-page-card-body-items-header'>PICKUP
                                <br />
                                <span>NEW YORK</span>
                                <br />
                                1234 Street Name, New York, NY 10001
                            </p>
                            <div className='order-page-card-body-items-time'>
                                <img src={circleBlue} alt="Circle Blue" className='circle-blue' />
                                <p>Accepted</p>
                            </div>
                            <p className='order-page-card-body-items-header'>DROPOFF
                                <br />
                                <span>NEW YORK</span>
                                <br />
                                1234 Street Name, New York, NY 10001

                            </p>
                            <div className='order-page-card-body-items-time'>
                                <img src={circleGray} alt="Circle Gray " className='circle-blue' />
                                <p>On hold</p>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

        </>

    )
}

export default OrderDetails