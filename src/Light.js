import React from "react";

function Light({ light }) {
  const top = light.y - light.radius
  const left = light.x - light.radius
  const height = light.radius * 2
  const width = light.radius * 2
  return (
    <div className="light" style={{top, left, height, width}}>
      Light
    </div>
  );
}

export default Light
