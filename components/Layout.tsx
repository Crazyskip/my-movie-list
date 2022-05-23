import { useSession } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./navbar";
import styled from "styled-components";

const ChildrenContainer = styled.div`
  min-height: calc(100vh - 128px);
`;

const Layout = ({ children }: any) => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <ChildrenContainer>{children}</ChildrenContainer>
      <Footer />
    </>
  );
};

export default Layout;
