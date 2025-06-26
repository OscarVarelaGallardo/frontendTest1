import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrdersPage';
import OrderDetails from './pages/OrderDetails';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/details/:orderId" element={<OrderDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
