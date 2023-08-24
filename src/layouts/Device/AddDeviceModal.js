import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadButton from "components/FileUpload";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddDeviceModal({ onAddDevice }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    status: "",
    deviceIcon: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputs", inputs.deviceIcon)

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("location", inputs.location);
    formData.append("latitude", inputs.latitude);
    formData.append("longitude", inputs.longitude);
    formData.append("status", inputs.status);
    formData.append("deviceIcon", inputs.deviceIcon);

    console.log("deviceFormdata", formData)

    await axios
      .post(`${process.env.REACT_APP_SERVER_IP}api/device/addDevice`, formData)
      .then((res) => {
        if (res?.data) {
          onAddDevice(res?.data);
          console.log("onSubmit success: ", res?.data);
          setOpen(false);
          setInputs({
            name: "",
            location: "",
            latitude: "",
            longitude: "",
            status: "",
            deviceIcon: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setInputs({ ...inputs, deviceIcon: e.target.files[0] });
    console.log("handleImageChange : ", e.target.files[0]);
  };
  return (
    <div>
      <MDButton variant="contained" color="primary" onClick={handleOpen}>
        Add Device
      </MDButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit}>
              <MDBox mb={4}>
                <MDInput
                  type="text"
                  name="name"
                  label="Name"
                  value={inputs.name}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Location</InputLabel>
                  <Select
                    name="location"
                    value={inputs.location}
                    label="Location"
                    onChange={handleChange}
                  >
                    <MenuItem value="building">Building</MenuItem>
                    <MenuItem value="floor">Floor</MenuItem>
                    <MenuItem value="room">Room</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="text"
                  name="longitude"
                  label="Longitude"
                  value={inputs.longitude}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="text"
                  name="latitude"
                  label="Latitude"
                  value={inputs.latitude}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    name="status"
                    value={inputs.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="grey">Grey</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={4}>
                <UploadButton labelText="Device Icon" value={inputs.deviceIcon} onChange={handleImageChange} />
              </MDBox>

              <MDBox mt={6} mb={1}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Add
                </MDButton>
              </MDBox>
            </form>
          </MDBox>
        </div>
      </Modal>
    </div>
  );
}

AddDeviceModal.defaultProps = {
  onAddDevice: () => {},
};

// Typechecking props for the Breadcrumbs
AddDeviceModal.propTypes = {
  onAddDevice: PropTypes.func,
};
