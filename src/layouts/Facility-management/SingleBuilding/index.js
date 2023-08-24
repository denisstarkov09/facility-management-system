import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FloorPlan from "examples/FloorPlan";

export default function SingleBuilding({ openDrawer, drawerBuilding, onCloseDrawer }) {
  const [state, setState] = React.useState(openDrawer);
  const [openFloorPlan, setOpenFloorPlan] = React.useState(false);
  const [openFloorId, setOpenFloorId] = React.useState(null);
  const [allDevice, setAllDevice] = React.useState([]);

  React.useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_IP}api/device/getDevice`)
      .then((res) => {
        if (res?.data) {
          console.log("get all device in floorplan: ", res?.data);
          setAllDevice(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("SingleBuilding: ", drawerBuilding, openDrawer, state);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    onCloseDrawer(open);
    setState(open);
  };

  const handleFloorPlan = (id) => {
    setOpenFloorPlan(true)
    setOpenFloorId(id)
    console.log("selected florr", id)
  }

  const buildingLayers = () => {
    const layers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < drawerBuilding.floors; i++) {
      // const top = `-${i * 22}px`;
      // const right = `${i * 10}px`;
      const tr = `-${i * 30}px`;
      layers.push(
        <Box key={i}>
          <Box
            onClick={(e) => { handleFloorPlan(i) }}
            sx={{
              width: "100%",
              height: "100%",
              border: "1px solid #41719C",
              // transform: "rotateX(20deg)",
              // transform: "rotate3d(17, -2, 5, 33deg)",
              transform: `translate(${tr}, ${tr})`,
              background: i % 2 === 0 ? "#E2F0D9" : "#E7E6E6",
              position: "absolute",
              // top,
              zIndex: i + 1,
            }}
          >
            <MDTypography
              display="inline"
              variant="p"
              textTransform="capitalize"
              fontWeight="bold"
              fontSize="1rem"
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                marginTop: "68%",
                transform: "rotate(0deg) skew(45deg) scale(1)",
              }}
            >
              {i === 0 ? "Basement-1" : `Floor-${i}`}
            </MDTypography>
          </Box>
        </Box>
      );
    }
    return layers;
  };

  const list = () => (
    <Box sx={{ width: "auto", height: "100%" }} role="presentation" >
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography display="block" variant="p" textTransform="capitalize" fontWeight="bold">
          {drawerBuilding.name}
        </MDTypography>
        <CloseIcon onClick={toggleDrawer(false)} />
      </MDBox>
      {openFloorPlan && (
        <FloorPlan
          openFloorPlan={openFloorPlan}
          floorDetails={{ floor: openFloorId, "_id": drawerBuilding["_id"] }}
          BuildingDetails={drawerBuilding}
          onCloserPlan={setOpenFloorPlan}
          allDevice={allDevice}
        />
      )}
      <MDBox
        pt={2}
        px={2}
        height="90%"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Box
          className="ravi"
          sx={{
            width: "250px",
            height: "200px",
            margin: "40px",
            // position: "relative",
            // perspective: "300px",
            // transform: "rotate3d(-1, 0, 0, 25deg)",
            transform: "rotate(1deg) skew(-45deg) scale(.8)",
            transformOrigin: "center",
          }}
        >
          {buildingLayers()}
        </Box>
      </MDBox>
    </Box>
  );

  return (
    <Box>
      <Drawer
        PaperProps={{
          sx: { width: "80%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </Box>
  );
}

SingleBuilding.defaultProps = {
  openDrawer: false,
  drawerBuilding: {},
  onCloseDrawer: () => { },
};

// Typechecking props for the Breadcrumbs
SingleBuilding.propTypes = {
  openDrawer: PropTypes.bool,
  drawerBuilding: PropTypes.shape({
    _id: PropTypes.string,
    floors: PropTypes.number,
    location: PropTypes.string,
    name: PropTypes.string,
  }),
  onCloseDrawer: PropTypes.func,
};
