import React from "react";
// import clsx from "clsx";
// import { styled } from "@mui/material/styles";
// import DashboardRoutes from "./routes/routes";
// import { Box } from "@mui/material";
import DashboardDrawer from "components/dashboard/dashboard_drawer";
import Dashboardindex from "./dashboard";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

function MiniDrawer() {
  return (
    // <Box sx={{ display: "flex" }}>
    <DashboardDrawer>
      <Dashboardindex />
    </DashboardDrawer>
    //   {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <DrawerHeader /> */}

    //   {/* </Box> */}
    // // </Box>
  );
}

function Dashboardhome() {
  // useEffect(() => {
  //   var navbar = document.querySelector("nav");
  //   navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
  //   navbar.classList.add("navbar-light", "bg-light", "shadow");
  // });

  return <MiniDrawer />;
}

export default Dashboardhome;
