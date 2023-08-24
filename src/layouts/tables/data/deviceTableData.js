/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export default function data() {
  return {
    columns: [
      { Header: "id", accessor: "id", width: "10%", align: "left" },
      { Header: "name", accessor: "name", align: "center" },
      { Header: "location", accessor: "location", align: "center" },
      { Header: "longitude", accessor: "longitude", align: "center" },
      { Header: "latitude", accessor: "latitude", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
  };
}
