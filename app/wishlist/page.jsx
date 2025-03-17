import WishList from "@/modules/search/components/WishList";
import Navbar from "@/modules/search/components/Navbar";
import Footer from "@/modules/search/components/Footer";
import { WishlistProvider } from "@/modules/search/context/WishlistContext";

const WishlistPage = () => {
  return (
    <WishlistProvider>
      <Navbar />
      <WishList />
      <Footer />
    </WishlistProvider>
  );
};

export default WishlistPage;
