import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import AdminLayout from "./layouts/AdminLayout"
import Home from "./pages/Home"
import CollectionDetail from "./pages/CollectionDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import CheckoutCancelled from "./pages/CheckoutCancelled"
import NotFound from "./pages/NotFound"
import ReportesInicio from "./pages/admin/ReportesInicio"
import VentasPorPeriodo from "./pages/admin/VentasPorPeriodo"
import ProductosMasVendidos from "./pages/admin/ProductosMasVendidos"
import ListadoPedidos from "./pages/admin/ListadoPedidos"

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
      {/* Ruta oculta: no aparece en Navigation ni en el footer. */}
      <Route path="/admin/reportes" element={<AdminLayout />}>
        <Route index element={<ReportesInicio />} />
        <Route path="ventas" element={<VentasPorPeriodo />} />
        <Route path="productos" element={<ProductosMasVendidos />} />
        <Route path="pedidos" element={<ListadoPedidos />} />
      </Route>
    </Routes>
  )
}

export default App
