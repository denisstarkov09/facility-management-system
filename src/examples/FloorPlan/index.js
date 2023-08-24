import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { NativeSelect } from "@mui/material";
import handledom from "./map";
import "./d3-context-menu.css";
import "./d3.v4.floorplan.css";

export default function FloorPlan({
  openFloorPlan,
  floorDetails,
  onCloserPlan,
  BuildingDetails,
  allDevice
}) {
  const [state, setState] = useState(openFloorPlan);
  const [svgexist, setsvgexist] = useState(false)
  
  const svgref = useRef()

  useEffect(() => {
    if (svgref.current) { 
      console.log("BuildingDetails", BuildingDetails)  
      handledom(BuildingDetails, allDevice) 
    }
    setsvgexist(true)
  }, [svgexist])

  

  console.log("Floor: ", openFloorPlan, floorDetails, state);

  const toggleDrawer = (open) => {
    onCloserPlan(open);
    setState(open);
  };
  
  return (
    <Dialog fullWidth={true} maxWidth="lg" open={state} onClose={onCloserPlan}>
      <DialogTitle>
        {floorDetails.floor === 0
          ? "Basement-1"
          : `Floor-${floorDetails.floor}`}
      </DialogTitle>
      <div>
        <Button id="poly">Create Zone</Button>
        <Button id="sensor">Place Device</Button>
        <select
          defaultValue={30}
          id="devices"
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
          className="deviceList"
        >
          {allDevice && allDevice.map(device => (
            <option value={device.deviceIcon}>{device.name} Device</option>
          ))}
        </select>
        <Button id="saveZone">Save zones</Button>
      </div>
      <svg id="floorPlanContainer" width="960" height="500" ref={svgref}></svg>
      <DialogActions style={{ padding: "0px" }}>
        <Button
          onClick={(e) => {
            toggleDrawer(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FloorPlan.defaultProps = {
  openFloorPlan: false,
  floorDetails: {},
  onCloserPlan: () => { },
};

// Typechecking props for the Breadcrumbs
FloorPlan.propTypes = {
  openFloorPlan: PropTypes.bool,
  floorDetails: PropTypes.shape({
    _id: PropTypes.string,
    floors: PropTypes.number,
  }),
  onCloserPlan: PropTypes.func,
};
