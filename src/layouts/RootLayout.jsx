import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navigation from "../sections/Navigation/Navigation"
import Footer from "../sections/Footer/Footer"
import "./RootLayout.css"

const RootLayout = () => {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const elemento = document.getElementById(hash.slice(1))
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return (
    <>
      <Navigation />
      <main
        className={
          pathname === "/"
            ? "layout__contenido"
            : "layout__contenido layout__contenido--interior"
        }
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
