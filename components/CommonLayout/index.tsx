import React, { ReactNode } from "react";
import Header from "../header/Header";

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Header component */}
      <Header />

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
