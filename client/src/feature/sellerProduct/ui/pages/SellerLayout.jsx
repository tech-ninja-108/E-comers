import { Outlet } from "react-router";
import SellerNavbar from "../../../../share/NavBar/ui/pages/SellerNavbar";

const SellerLayout = () => {
  return (
    <>
      <SellerNavbar />
      <Outlet />
    </>
  );
};

export default SellerLayout;
