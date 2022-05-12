import { useSession } from "next-auth/react";
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
    </>
  );
};

export default Layout;
