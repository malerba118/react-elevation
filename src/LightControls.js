import React, { useState } from "react";
import { Slider, Tooltip, Typography } from "@material-ui/core";
import { useWindowSize } from "react-use";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function LightControls({ light, onChange }) {
  const windowDimensions = useWindowSize();
  return (
    <div className="light-controls">
      <Typography align="left" variant="subtitle1" gutterBottom>
        Light Controls
      </Typography>
      <Typography align="left" variant="body2">
        x
      </Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        onChange={(e, v) => onChange("x", v)}
        value={light.x}
        min={0}
        max={windowDimensions.width}
      />
      <Typography align="left" variant="body2">
        y
      </Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        onChange={(e, v) => onChange("y", v)}
        value={light.y}
        min={0}
        max={windowDimensions.height}
      />
      <Typography align="left" variant="body2">
        z
      </Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        onChange={(e, v) => onChange("z", v)}
        value={light.z}
        min={800}
        max={5000}
      />
      <Typography align="left" variant="body2">
        radius
      </Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        onChange={(e, v) => onChange("radius", v)}
        value={light.radius}
        min={20}
        max={100}
      />
    </div>
  );
}

export default LightControls;
