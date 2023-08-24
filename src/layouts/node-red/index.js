import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useValidUser from "../authentication/hooks/useValidUser";

function NodeRed() {
  const { token } = useValidUser();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <iframe
        title="Work-Flow"
        src={`${process.env.REACT_APP_SERVER_IP}red/?access_token=${token}`}
        style={{ height: "80vh", width: "100%", flex: "1" }}
      />
    </DashboardLayout>
  );
}

export default NodeRed;
