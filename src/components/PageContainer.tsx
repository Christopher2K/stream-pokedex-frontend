import { FC } from "react";

import { Navbar } from "./Navbar";

export const PageContainer: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
