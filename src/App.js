import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

import Palette from "./Palette";
import Palettelist from "./Palettelist";
import SingleColorPalette from "./SingleColorPalette";
import NewpaletteForm from "./NewpaletteForm";

import seedColors from "./seedColors";
import { generatePalette } from "./codeHelpers";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
  const findPalette = id => palettes.find(palette => 
    palette.id === id
);
const savePalette = (newPalette) => {
  setPalettes(palettes=> [...palettes, newPalette]);
}
const deletePalette = (id) => {
  setPalettes(palettes=> palettes.filter(palette=> palette.id!== id))
}
const resetPalettes = () => {
  setPalettes( palettes => seedColors );
};

React.useEffect(() => {
  window.localStorage.setItem("palettes", JSON.stringify(palettes));
}, [palettes])
 
const PaletteComponentWrapper = () => {
    const { id } = useParams();
    return <Palette palette={generatePalette(findPalette(id))} />;
};
const SingleColorPaletteComponentWrapper = () => {
  const { paletteID, colorID } = useParams();
  return <SingleColorPalette colorId={colorID} palette={generatePalette(findPalette(paletteID))} />;
};

  return (
    <Routes>
    <Route path="/" element={<Palettelist resetPalettes={resetPalettes} palettes={palettes} deletePalette={deletePalette}/>} />
    <Route path="/palette/:id"  element={<PaletteComponentWrapper />} />
    <Route path="/palette/:paletteID/:colorID" element={<SingleColorPaletteComponentWrapper/>} />
    <Route path="/palette/new" element={<NewpaletteForm palettes={palettes} savePalette={savePalette}/>}/>
    <Route path='*' element={<Palettelist palettes={palettes} deletePalette={deletePalette}/>} />
    </Routes>
    // <div>
    //   <Palette palette={generatePalette(seedColors[1])} />
    // </div>
  );
}

export default App;
