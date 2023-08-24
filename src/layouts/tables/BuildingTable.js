import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import BuildingIcon from "assets/images/building/building.png";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import buildingsTableData from "layouts/tables/data/buildingsTableData";
import DeleteIcon from "@mui/icons-material/Delete";

function BuildingTable({ allBuilding, onDeleteBuilding, onOpenDrawer }) {
  const { columns: pColumns } = buildingsTableData();
  console.log("allBuilding: ", allBuilding);

  const deleteBuilding = async (e, id) => {
    e.preventDefault();
    console.log("deleteBuilding: ", id);
    await axios
      .delete(`${process.env.REACT_APP_SERVER_IP}api/building/deleteBuilding/${id}`)
      .then((res) => {
        if (res?.data) {
          onDeleteBuilding(res?.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const Project = React.memo(({ image, name, building }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar
        onClick={() => onOpenDrawer(building)}
        src={image}
        name={name}
        size="sm"
        variant="rounded"
      />
    </MDBox>
  ));
  Project.defaultProps = {
    image: "",
    name: "",
    building: {},
  };

  Project.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    building: PropTypes.shape({
      _id: PropTypes.string,
      floors: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
    }),
  };

  /* eslint no-underscore-dangle: 0 */
  const buildingList = [];
  allBuilding.map((b, i) =>
    buildingList.push({
      id: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {i + 1}
        </MDTypography>
      ),
      icon: <Project image={BuildingIcon} name="Asana" building={b} />,
      floors: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.floors}
        </MDTypography>
      ),
      location: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.location}
        </MDTypography>
      ),
      name: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.name}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <DeleteIcon onClick={(e) => deleteBuilding(e, b._id)} />
        </MDTypography>
      ),
    })
  );

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Building List
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: pColumns, rows: buildingList }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default BuildingTable;

BuildingTable.defaultProps = {
  allBuilding: [],
  onDeleteBuilding: () => {},
  onOpenDrawer: () => {},
};

// Typechecking props for the Breadcrumbs
BuildingTable.propTypes = {
  allBuilding: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      floors: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onDeleteBuilding: PropTypes.func,
  onOpenDrawer: PropTypes.func,
};
