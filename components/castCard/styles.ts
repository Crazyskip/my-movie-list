import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
  margin: 5px;
  min-width: 150px;
  max-width: 150px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const CardImage = styled(Image)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const CardContent = styled.div`
  padding: 5px 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 5px 0;
`;
