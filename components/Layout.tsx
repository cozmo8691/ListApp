import { Box } from "@chakra-ui/layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="100vw" height="100vh">
      {/* <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box> */}
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        player
      </Box>
    </Box>
  );
};

export default Layout;
