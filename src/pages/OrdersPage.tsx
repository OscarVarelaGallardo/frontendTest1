import './OrdersPage.css'
import bell from '../assets/icons/bell.svg'
import iconBack from '../assets/icons/icon-back.svg'
import searchIcon from '../assets/icons/search-icon.svg'
import { getAllOrders } from '../api'
import Order from '../components/Order'
import { useEffect, useState } from 'react'

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchAllOrders, setfetchAllOrders] = useState<OrderDTO[]>([]);
  // Define OrderDTO to match the structure expected by <Order />

  type OrderDTO = {
    order_number: string;
    destination: string;
    date: string;
    status: string;

  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getAllOrders();
        if (orders.result.length === 0 || !orders.result) {
          console.error('No orders found in the result');
          setOrders([]);
          return;
        }

        setOrders(orders.result);
        setfetchAllOrders(orders.result);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      console.log('Search term is empty, resetting orders to all fetched orders');
      setOrders(fetchAllOrders);
      setSearchTerm('');
      return;
    }
    const filteredOrders = orders.filter((order: OrderDTO) => {
      return order?.order_number.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setOrders(filteredOrders);

  }, [searchTerm]);


  return (

    <div className="orders-page-container">
      <div className="orders-page-header">
        <img src={iconBack} alt="Back Icon" className="back-icon" />
        <h2 className="orders-page-title">
          Cargo Orders</h2>
        <img src={bell} alt="Bell Icon" className="icon-bell" />
      </div>
      <div className="orders-page-tabs">
        <div className='orders-page-tabs-item'>
          <p className='orders-page-tabs-item-text active'>Upcoming</p>
        </div>
        <div className='orders-page-tabs-item'>
          <p className='orders-page-tabs-item-text'>Completed</p>
        </div>
        <div className='orders-page-tabs-item'>
          <p className='orders-page-tabs-item-text'>Past</p>
        </div>
      </div>
      <div className="orders-page-search">
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
        <input type="text" className="search-input"
          placeholder="Search by order number, destination, or date"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/*   // eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <Order orders={orders}/>


    </div>



  )
}

export default OrderPage