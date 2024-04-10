import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Playground, { createGrid } from './Playground';

function App() {
  const [grids, setGrids] = useState([]);
  const [gridDetails, setGridDetails] = useState(undefined);

  const addGrid = (gridName, gridSize) => {
    const newGrid = {
      id: grids.length + 1,
      name: gridName,
      size: gridSize,
      cellSize: 20,
      cells: createGrid(gridSize, gridSize),//randomizeGrid(createGrid(gridSize, gridSize)),
      running: false,
      reset: true,
    };
    setGrids([...grids, newGrid]);
  };

  const UpdateGrid = (newGrid) => {
    console.log(newGrid, 'newGrid');
    setGridDetails(newGrid)
    const updateGR = grids.map((item) => item.id === newGrid.id ? newGrid : item)
    setGrids(updateGR);
  };

  const removeGrid = (e, index) => {
    e.stopPropagation()
    const updatedGrids = [...grids];
    updatedGrids.splice(index, 1);
    setGrids(updatedGrids);
  };

  return (
    <div>
      {!gridDetails ? <Dashboard grids={grids} removeGrid={removeGrid} addGrid={addGrid} setGridDetails={setGridDetails} />
        : <Playground gridDetails={gridDetails} UpdateGrid={UpdateGrid} goHome={() => setGridDetails(undefined)} />}
    </div>
  );
}

export default App;
