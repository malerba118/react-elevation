import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Paper, LightProvider } from './react-elevation'
import { Grid } from '@material-ui/core'
import LightControls from './LightControls'
import Light from './Light'
import { range } from './utils'
import classNames from 'classnames'
import './styles.css'

const HoverPaper = ({hoverElevation, elevation, className, ...otherProps}) => {
  const [hovered, setHovered] = useState(false)
  const scaleAmount = hovered ? 1 + (hoverElevation - elevation) / 2200 : 1
  return <Paper
    className={classNames("paper", className)}
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)} 
    elevation={hovered ? hoverElevation : elevation}
    style={{transform: `scale(${scaleAmount})`, transition: 'transform .3s'}}
    {...otherProps}
  />
}

function App() {
  const [light, setLight] = useState({x: 20, y: 20, z: 800, radius: 60})

  const setLightAttr = (attr, val) => {
    setLight(prev => ({
      ...prev,
      [attr]: val
    }))
  }

  return (
    <div className="App">
      <LightControls onChange={setLightAttr} light={light} />
      <Light light={light} />
      <LightProvider x={light.x} y={light.y} z={light.z} radius={light.radius}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HoverPaper elevation={20} hoverElevation={50}>
              <Paper className="paper inset" elevation={-20}>
                Hello World
              </Paper>
            </HoverPaper>
          </Grid>
          <Grid item xs={6}>
            <HoverPaper elevation={20} hoverElevation={50}>xs=6</HoverPaper>
          </Grid>
          <Grid item xs={6}>
            <HoverPaper elevation={20} hoverElevation={50}>xs=6</HoverPaper>
          </Grid>
          {range(16).map(i => (
            <Grid key={i} item xs={3}>
              <HoverPaper elevation={20} hoverElevation={50}>xs=3</HoverPaper>
            </Grid>
          ))}
           {range(16).map(i => (
            <Grid key={i} item xs={3}>
              <HoverPaper className="rounded" elevation={20} hoverElevation={50}>xs=3</HoverPaper>
            </Grid>
          ))}
        </Grid>
      </LightProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
