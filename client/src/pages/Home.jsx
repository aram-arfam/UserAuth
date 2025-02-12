import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/appContext";

const Home = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex flex-col items-center justify-center ">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
