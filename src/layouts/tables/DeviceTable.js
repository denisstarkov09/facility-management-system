import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import deviceTableData from "layouts/tables/data/deviceTableData";
import DeleteIcon from "@mui/icons-material/Delete";

function DeviceTable({ allDevice, onDeleteDevice }) {
  const { columns: pColumns } = deviceTableData();

  const deleteDevice = async (e, id) => {
    e.preventDefault();
    console.log("deleteDevice: ", id);
    await axios
      .delete(`${process.env.REACT_APP_SERVER_IP}api/device/deleteDevice/${id}`)
      .then((res) => {
        if (res?.data) {
          onDeleteDevice(res?.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const Project = React.memo(({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
    </MDBox>
  ));
  Project.defaultProps = {
    image: "",
    name: "",
    device: {},
  };

  Project.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    device: PropTypes.shape({
      _id: PropTypes.string,
      floors: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
    }),
  };

  /* eslint no-underscore-dangle: 0 */
  const deviceList = [];
  allDevice.map((b, i) =>
    deviceList.push({
      id: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {i + 1}
        </MDTypography>
      ),
      name: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.name}
        </MDTypography>
      ),
      location: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.location}
        </MDTypography>
      ),
      longitude: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.longitude}
        </MDTypography>
      ),
      latitude: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.latitude}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {b.status}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <DeleteIcon onClick={(e) => deleteDevice(e, b._id)} />
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
                Device List
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: pColumns, rows: deviceList }}
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

export default DeviceTable;

DeviceTable.defaultProps = {
  allDevice: [],
  onDeleteDevice: () => {},
};

// Typechecking props for the Breadcrumbs
DeviceTable.propTypes = {
  allDevice: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      floors: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onDeleteDevice: PropTypes.func,
};
