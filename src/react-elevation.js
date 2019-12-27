import React, {
  createContext,
  useContext,
  useRef,
} from "react";
import useCenter from './useCenter'

const LightContext = createContext([]);

const LightProvider = ({ x = 0, y = 0, z = 1000, radius = 50, children }) => {
  return (
    <LightContext.Provider value={{x, y, z, radius}}>
      {children}
    </LightContext.Provider>
  );
};

const ElevationContext = createContext(0);

const Paper = ({ as: As = 'div', elevation, children, style, shadowTransitionDuration = '.3s', shadowTransitionTimingFunc = 'ease', ...otherProps }) => {
  const light = useContext(LightContext);
  const inheritedElevation = useContext(ElevationContext);
  const ref = useRef();
  let inset = false

  if (elevation < 0) {
    inset = true
    elevation = Math.abs(elevation)
  }

  const center = useCenter(ref.current)
  
  const xOffset = getXOffset({center, inheritedElevation, elevation, light})
  const yOffset = getYOffset({center, inheritedElevation, elevation, light})
  const blur = getBlur({light})
  const spread = getSpread({inheritedElevation, elevation, light, inset})

  let boxShadow = `${xOffset}px ${yOffset}px ${blur}px ${spread}px`
  if (inset) {
    boxShadow = 'inset ' + boxShadow
  }

  let transition = `box-shadow ${shadowTransitionDuration} ${shadowTransitionTimingFunc}`
  if (style && style.transition) {
    transition += `, ${style.transition}`
  }

  return (
    <ElevationContext.Provider value={inheritedElevation + elevation}>
      <As 
        {...otherProps}
        style={{
          ...style, 
          boxShadow,
          transition
        }} 
        ref={r => (ref.current = r)}
      >
        {children}
      </As>
    </ElevationContext.Provider>
  );
};

const getXOffset = ({center, inheritedElevation, elevation, light}) => {
    const totalElevation = inheritedElevation + elevation
    const distanceToLight = light.z - totalElevation
    if (center && light) {
      const opposite = center.x - light.x
      const adjacent = distanceToLight
      const theta = Math.atan(opposite/adjacent)
      return elevation * Math.tan(theta)
    }
    return 0
  }

const getYOffset = ({center, inheritedElevation, elevation, light}) => {
  const totalElevation = inheritedElevation + elevation
  const distanceToLight = light.z - totalElevation
  if (center && light) {
    const opposite = center.y - light.y
    const adjacent = distanceToLight
    const theta = Math.atan(opposite/adjacent)
    return elevation * Math.tan(theta)
  }
  return 0
}

const getBlur = ({light}) => {
  return light.radius / 10
}

const getSpread = ({inheritedElevation, elevation, light, inset}) => {
  // approaches 100 as elevation meets light
  // approaches 0 as light reaches infinity
  if (inset) {
    return 0
  }
  const totalElevation = inheritedElevation + elevation
  let normalizedSpread = Math.floor(totalElevation  / (light.z + totalElevation) * 100)
  return normalizedSpread
}

export {
  Paper,
  LightProvider
}