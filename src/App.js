import React, { useState, useEffect } from 'react';
import './App.css';
// import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Playground from './Playground';

// Helper function to create a 2D array representing the grid
const createGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
};

// Helper function to generate random initial cell state
const randomizeGrid = (grid) => {
  return grid.map(row => row.map(() => Math.random() < 0.3)); // Adjust the probability for initial live cells
};

// Helper function to count live neighbors for a given cell
const countLiveNeighbors = (grid, x, y) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0)) {
        const neighborX = x + i;
        const neighborY = y + j;
        if (neighborX >= 0 && neighborX < rows && neighborY >= 0 && neighborY < cols) {
          count += grid[neighborX][neighborY] ? 1 : 0;
        }
      }
    }
  }
  return count;
};

// // Main App component
// export function App1() {
//   const [gridSize, setGridSize] = useState({ rows: 10, cols: 10 });
//   const [grid, setGrid] = useState(createGrid(gridSize.rows, gridSize.cols));
//   const [running, setRunning] = useState(false);

//   useEffect(() => {
//     if (running) {
//       const interval = setInterval(updateGrid, 100);
//       return () => clearInterval(interval);
//     }
//   }, [running, grid]);

//   const updateGrid = () => {
//     setGrid(prevGrid => {
//       const newGrid = prevGrid.map((row, x) =>
//         row.map((cell, y) => {
//           const liveNeighbors = countLiveNeighbors(prevGrid, x, y);
//           if (cell) {
//             return liveNeighbors === 2 || liveNeighbors === 3;
//           } else {
//             return liveNeighbors === 3;
//           }
//         })
//       );
//       return newGrid;
//     });
//   };

//   const toggleCell = (x, y) => {
//     if (!running) {
//       setGrid(prevGrid => {
//         const newGrid = [...prevGrid];
//         newGrid[x][y] = !newGrid[x][y];
//         return newGrid;
//       });
//     }
//   };

//   const handleStartStop = () => {
//     setRunning(!running);
//   };

//   const handleReset = () => {
//     setGrid(createGrid(gridSize.rows, gridSize.cols));
//     setRunning(false);
//   };

//   const handleRandomize = () => {
//     setGrid(randomizeGrid(createGrid(gridSize.rows, gridSize.cols)));
//     setRunning(false);
//   };

//   return (
//     <div className="App">
//       <div className="controls">
//         <button onClick={handleStartStop}>{running ? 'Pause' : 'Start'}</button>
//         <button onClick={handleReset}>Reset</button>
//         <button onClick={handleRandomize}>Randomize</button>
//       </div>
//       <div className="grid">
//         {grid.map((row, x) => (
//           <div key={x} className="row">
//             {row.map((cell, y) => (
//               <div
//                 key={`${x}-${y}`}
//                 className={`cell ${cell ? 'alive' : ''}`}
//                 onClick={() => toggleCell(x, y)}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







function App() {
  const [grids, setGrids] = useState([]);
  const [gridDetails, setGridDetails] = useState(undefined);

  const addGrid = (gridName, gridSize) => {
    // console.log(grids.findLastIndex(), 'index');
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
