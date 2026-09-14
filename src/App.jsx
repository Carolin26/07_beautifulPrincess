import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import CollectionDetail from "./pages/CollectionDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import CheckoutCancelled from "./pages/CheckoutCancelled"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/collections/:coleccionId"
          element={<CollectionDetail />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/confirmado" element={<OrderConfirmation />} />
        <Route path="/checkout/cancelado" element={<CheckoutCancelled />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
