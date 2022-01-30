import { Box } from "@chakra-ui/layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="100vw" height="100vh">
      {children}
    </Box>
  );
};

export default Layout;
