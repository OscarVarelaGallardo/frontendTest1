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

import { useNavigate } from 'react-router-dom';
import './OrderDetails.css';


const OrderDetails = () => {
    const navigate = useNavigate();
    return (

        <>
            <div className="order-details-container">
                <div className="order-details-header">
                    <img src={iconBack} onClick={() => navigate('/')} alt="Back Icon" />
                    <h2 className="order-details-title">Cargo Details</h2>
                    <img src={bell} alt="Bell Icon" />
                </div>

                <div className="order-details-card">
                    <div className="order-details-card-header">
                        <p className="order-details-card-header-title">
                            <span className="order-details-card-header-title-number">Referencia A1190</span>
                            <br />
                            Order Number #7804GNZ
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
                                <span>NEW YORK</span><br />
                                1234 Street Name, New York, NY 10001
                            </p>

                            <div className="order-details-status">
                                <img src={circleBlue} alt="Circle Blue" className="order-details-circle-icon" />
                                <p>Accepted</p>
                            </div>

                            <p className="order-details-location">
                                DROPOFF <br />
                                <span>NEW YORK</span><br />
                                1234 Street Name, New York, NY 10001
                            </p>

                            <div className="order-details-status">
                                <img src={circleGray} alt="Circle Gray" className="order-details-circle-icon" />
                                <p>On hold</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="order-details-card-timeline" style={{ marginTop: '40px' }}>
                    <div className="order-details-tracking-header">
                        <img src={userPhoto} alt="User Icon" className="order-details-user-icon" />
                    </div>

                    <div className="order-details-tracking-time">
                        <p>10:30pm </p>
                    </div>
                    <div className='order-details-tracking-status'>
                        <div className='order-details-tracking-status-item'>
                            <div className='circle-item'>
                                <img src={checked} alt="Checked Icon" className='checked-icon' />
                            </div>
                            <div className='circle-item'>
                                <img src={checked} alt="Checked Icon" className='checked-icon' />
                            </div>
                            <div className='circle-item'>
                                <img src={checked} alt="Checked Icon" className='checked-icon' />
                            </div>
                            <img src={unchecked} alt="Unchecked Icon" className='unchecked-icon' />
                        </div>
                        <div className='order-details-tracking-status-item-text'>
                            <p className='order-details-tracking-status-item-text'>Created Order</p>
                            <p className='order-details-tracking-status-item-text'>Accepted Order</p>
                            <p className='order-details-tracking-status-item-text'>Pickup set up by User</p>
                            <p className='order-details-tracking-status-item-text'>Pickup Completed</p>
                        </div>

                    </div>
                    <div className='order-details-tracking-status-footer'>
                        <p>Track Order</p>
                    </div>
                    
                </div>
                <div className='order-details-pickData'>
                    <p>Pickup Data</p>
                        <img src={arrowUp} alt="Arrow up" className='arrow-up' />
                </div>

            </div>

        </>
    )
}

export default OrderDetails