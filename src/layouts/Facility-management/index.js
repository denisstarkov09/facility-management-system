import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import BuildingTable from "layouts/tables/BuildingTable";
import MDBox from "components/MDBox";
import AddBuildingModal from "./AddBuildingModal";
import SingleBuilding from "./SingleBuilding";

function FacilityManagement() {
  const [allBuilding, setAllBuilding] = useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [drawerBuilding, setDrawerBuilding] = React.useState({});

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_IP}api/building/getBuilding`)
      .then((res) => {
        if (res?.data) {
          console.log("get all building success: ", res?.data);
          setAllBuilding(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddBuilding = (data) => setAllBuilding(data);

  const handleDeleteBuilding = (data) => setAllBuilding(data);

  const handleOpenDrawer = (building) => {
    console.log("handleOpenDrawer: ", building);
    setOpenDrawer(true);
    setDrawerBuilding(building);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} px={2} display="flex" justifyContent="flex-end" alignItems="center">
        <AddBuildingModal onAddBuilding={handleAddBuilding} />
      </MDBox>
      {openDrawer && (
        <SingleBuilding
          openDrawer={openDrawer}
          onCloseDrawer={setOpenDrawer}
          drawerBuilding={drawerBuilding}
        />
      )}
      <BuildingTable
        allBuilding={allBuilding}
        onOpenDrawer={handleOpenDrawer}
        onDeleteBuilding={handleDeleteBuilding}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default FacilityManagement;
