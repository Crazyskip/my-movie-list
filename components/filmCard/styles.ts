import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
  margin: 5px;
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const CardImage = styled(Image)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const CardContent = styled.div`
  padding: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 8px 0;
`;
