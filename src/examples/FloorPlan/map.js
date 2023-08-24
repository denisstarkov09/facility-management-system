import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
export default function handledom(BuildingDetails, allDevice) {
  var svg = window.d3.select("#floorPlanContainer");
  var width = +svg.attr("width");
  var height = +svg.attr("height");
  var g = svg.append("g").attr("transform", "translate(32," + height / 2 + ")");
  var map = window.d3.floorplan();
  console.log(BuildingDetails.floorPlan);
  if (BuildingDetails.floorPlanMapData[0]) {
    var mapdata = BuildingDetails.floorPlanMapData[0];
  } else {
    var mapdata = {
      floors: [
        {
          id: uuid(),
          name: "Floor 1",
          image: {
            url: BuildingDetails.floorPlan,
            x: 0,
            y: 0,
            w: width,
            h: height,
          },
          zones: [],
          sensors: [
            {
              id: uuid(),
              name: "Sensor - 0",
              url: "/bluetooth_logo.png",
              x: 50,
              y: 50,
              w: 0,
              h: 0,
            },
          ],
        },
      ],
    };
  }
  // Load Floor image layers
  map.imageLayers(svg, mapdata.floors);
  // Load default polygons.
  map.zonePolygons(svg, mapdata.floors[0].zones);

  // Load and Draw sensors
  mapdata.floors[0].sensors.forEach(function (sensor) {
    new map.sensorImageLayer(svg, mapdata.floors[0], sensor);
  });

  // Draw Zone function

  var drawZone = window.d3.select("#poly").on("click", function () {
    var zonePolyPoints = [];
    var zone = {
      id: uuid(),
      name: "ZONE - " + uuid(),
      points: zonePolyPoints,
    };

    mapdata.floors[0].zones.push(zone);
    new map.drawZonePolygon(svg, zone);
  });

  // Draw Sensor Image function
  var deviceIconPath = window.d3.select("#devices").node().value;
  var selectedVal = window.d3.select("#devices").on("change", function (e) {
    deviceIconPath = window.d3.select("#devices").node().value
  })
  var drawSensor = window.d3.select("#sensor").on("click", function () {
    if (deviceIconPath === '') {
      alert("There isn't any device that you added")
    }
    var zonePolyPoints = [];
    var sensor = {
      id: uuid(),
      name: "Sensor - " + uuid(),
      url: deviceIconPath,
      x: 50,
      y: 50,
      w: 32,
      h: 32,
    };
    // var imgContainer = svg.append("g")
    //   .attr("transform", "translate(0,20)");

    // var img = imgContainer.append("svg:image")
    //   .attr("xlink:href", deviceIconPath)
    //   .attr("width", 32)
    //   .attr("height", 32)
    //   .attr("cx", 0)
    //   .attr("cy", 0)
    //   .attr("id", uuid())
    //   .attr("name", "Sensor - " + uuid())

    // var text = imgContainer.append("svg:text")
    //   .attr("cx", 82)
    //   .attr("cy", 50)
    //   .text("red");


    mapdata.floors[0].sensors.push(sensor);
    new map.sensorImageLayer(svg, mapdata.floors[0], sensor);
  });

  // save data
  var saveMapData = window.d3.select("#saveZone").on("click", function () {
    // Reacalculate all coordinate points.
    mapdata.floors[0].sensors.forEach(function (sensor) {
      console.log(sensor);
      var cssAttribute = window.$("g.sensor-" + sensor.id).css("transform");
      var matrix = cssAttribute.replace(/[^0-9\-.,]/g, "").split(",");
      sensor.x += parseInt(matrix[4]);
      sensor.y += parseInt(matrix[5]);
    });
    console.log(mapdata);
    let postMapData = async () => {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_IP}api/building/floorPlanMapData`,
          {
            mapdata: mapdata,
            buildingName: BuildingDetails.name,
            floorCount: BuildingDetails.floors,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    postMapData();
  });

  // Helper to add uuids
  function uuid() {
    var uuid = "",
      i,
      random;
    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-";
      }
      uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
    }
    return uuid;
  }
}
