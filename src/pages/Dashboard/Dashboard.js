import { Grid } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <Grid
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid.Col lg={3}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col lg={9}>
        <div style={{ overflowY: "scroll", height: "98vh" }}>
          <Outlet />
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default Dashboard;
