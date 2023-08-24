import * as React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import MDInput from "components/MDInput";
import { InputLabel } from "@mui/material";
import MDTypography from "components/MDTypography";

export default function UploadButton({ labelText, onChange }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <MDTypography variant="text" color="text" fontWeight="medium">
        {labelText}
      </MDTypography>
      <InputLabel htmlFor="contained-button-file">
        <MDInput
          name="floorPlan"
          onChange={onChange}
          accept="image/*"
          id="contained-button-file"
          type="file"
        />
      </InputLabel>
    </Stack>
  );
}

UploadButton.defaultProps = {
  labelText: "",
  onChange: () => {},
};

UploadButton.propTypes = {
  labelText: PropTypes.string,
  onChange: PropTypes.func,
};
