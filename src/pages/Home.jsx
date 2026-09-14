import Hero from "../sections/Hero/Hero"
import Marquee from "../sections/Marquee/Marquee"
import Collections from "../sections/Collections/Collections"
import FeaturedPiece from "../sections/FeaturedPiece/FeaturedPiece"
import Craftsmanship from "../sections/Craftsmanship/Craftsmanship"
import Testimonials from "../sections/Testimonials/Testimonials"
import Newsletter from "../sections/Newsletter/Newsletter"

const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <FeaturedPiece />
      <Craftsmanship />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default Home
