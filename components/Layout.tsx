import { useSession } from "next-auth/react";
import ContentContainer from "./contentContainer";
import Footer from "./footer";
import Navbar from "./navbar";
import Spinner from "./spinner";

const Layout = ({ children }: any) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );
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
