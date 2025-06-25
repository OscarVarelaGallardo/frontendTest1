import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrdersPage';
import OrderDetails from './pages/OrderDetails';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/details" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
