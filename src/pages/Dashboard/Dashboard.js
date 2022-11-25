import { Grid } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Grid>
        <Grid.Col lg={3}>
          <Sidebar />
        </Grid.Col>
        <Grid.Col lg={9}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
