import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DeviceTable from "layouts/tables/DeviceTable";
import MDBox from "components/MDBox";
import AddDeviceModal from "./AddDeviceModal";

function Device() {
  const [allDevice, setAllDevice] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_IP}api/device/getDevice`)
      .then((res) => {
        if (res?.data) {
          console.log("get all device success: ", res?.data);
          setAllDevice(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddDevice = (data) => setAllDevice(data);

  const handleDeleteDevice = (data) => setAllDevice(data);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} px={2} display="flex" justifyContent="flex-end" alignItems="center">
        <AddDeviceModal onAddDevice={handleAddDevice} />
      </MDBox>
      <DeviceTable allDevice={allDevice} onDeleteDevice={handleDeleteDevice} />
      <Footer />
    </DashboardLayout>
  );
}

export default Device;
