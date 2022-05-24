import { useSession } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
