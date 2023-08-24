import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
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

export default function AddBuildingModal({ onAddBuilding }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    floors: "",
    location: "",
    BuildingName: "",
    floorPlan: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    const formData = new FormData();
    formData.append("floorPlan", inputs.floorPlan);
    formData.append("floors", inputs.floors);
    formData.append("location", inputs.location);
    formData.append("BuildingName", inputs.BuildingName);

    console.log("onSubmit: ", inputs, formData);

    await axios
      .post(`${process.env.REACT_APP_SERVER_IP}api/building/addBuilding`, formData)
      .then((res) => {
        if (res?.data) {
          onAddBuilding(res?.data);
          console.log("onSubmit success: ", res?.data);
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    console.log("handleChange : ", e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setInputs({ ...inputs, floorPlan: e.target.files[0] });
    console.log("handleImageChange : ", e.target.files[0]);
  };
  return (
    <div>
      <MDButton variant="contained" color="primary" onClick={handleOpen}>
        Add Building
      </MDButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <MDBox mb={4}>
                <MDInput
                  type="number"
                  name="floors"
                  label="Floors"
                  value={inputs.floors}
                  onChange={handleChange}
                  variant="standard"
                  required="required"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="text"
                  name="location"
                  label="Location"
                  value={inputs.location}
                  onChange={handleChange}
                  variant="standard"
                  required="required"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="text"
                  name="BuildingName"
                  label="Name"
                  value={inputs.BuildingName}
                  onChange={handleChange}
                  variant="standard"
                  required="required"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <UploadButton labelText="Floor plan" onChange={handleImageChange} />
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

AddBuildingModal.defaultProps = {
  onAddBuilding: () => {},
};

// Typechecking props for the Breadcrumbs
AddBuildingModal.propTypes = {
  onAddBuilding: PropTypes.func,
};
