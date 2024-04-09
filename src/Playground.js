import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { App1 } from './App';
import { Edit } from '@mui/icons-material';
import { AddGridComponent } from './Dashboard';

// Helper function to create a 2D array representing the grid
export const createGrid = (rows, cols) => {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
};

// Helper function to generate random initial cell state
export const randomizeGrid = (grid) => {
    return grid?.map(row => row?.map(() => Math.random() < 0.3)); // Adjust the probability for initial live cells
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

function Playground({ gridDetails, UpdateGrid, goHome }) {
    const [open, setOpen] = useState(undefined);

    console.log(gridDetails, '234567');
    useEffect(() => {
        if (gridDetails.running) {
            const interval = setInterval(updateGrids, 100);
            return () => clearInterval(interval);
        }
    }, [gridDetails.running, gridDetails.cells]);

    const updateGrids = () => {
        const newCells = gridDetails.cells?.map((row, x) =>
            row?.map((cell, y) => {
                const liveNeighbors = countLiveNeighbors(gridDetails.cells, x, y);
                if (cell) {
                    return liveNeighbors === 2 || liveNeighbors === 3;
                } else {
                    return liveNeighbors === 3;
                }
            })
        );
        const newData = { ...gridDetails, ['cells']: newCells }
        UpdateGrid(newData)
    };

    const toggleCell = (x, y) => {
        if (!gridDetails.running) {
            const newGrid = [...gridDetails.cells];
            newGrid[x][y] = !newGrid[x][y];
            const newData = { ...gridDetails, ['cells']: newGrid }
            UpdateGrid(newData)
        }
    };

    const handleStartStop = () => {
        let grid = gridDetails.cells
        let reset = gridDetails.reset
        if (!gridDetails.running && reset) {
            grid = randomizeGrid(createGrid(gridDetails.size, gridDetails.size))
        } else {
            reset = false
        }
        const newData = { ...gridDetails, ['running']: !gridDetails.running, ['cells']: grid, ['reset']: reset }
        UpdateGrid(newData)
    };

    const handleReset = () => {
        const newCells = createGrid(gridDetails.size, gridDetails.size)
        const newData = { ...gridDetails, ['cells']: newCells, ['running']: false, reset: true }
        UpdateGrid(newData)
    };
    const handleUpdate = (gridName, gridSize, cellSize) => {
        let cells = gridDetails.cells
        let running = gridDetails.running
        let reset = gridDetails.reset
        if (open === 'size') {
            cells = createGrid(gridSize, gridSize)
            running = false
            reset = true
        }
        UpdateGrid({ ...gridDetails, ['name']: gridName, ['size']: gridSize, cellSize, cells, running, reset })

    }
    const handleOpen = (key) => {
        UpdateGrid({ ...gridDetails, running: false })

        setOpen(key)
    }
    return (
        <div>
            <h2>Playground</h2>
            <Box className="borderedBox" >
                <Box className={'borderedGrid'} sx={{ display: 'flex', py: 1, mb: 5, alignItems: 'center', width: '30%', justifyContent: 'space-between' }}>
                    <span> {gridDetails.name}</span>  <Edit fontSize='small' onClick={() => handleOpen('name')} />
                </Box>

                <Box className="center" >
                    <Button variant='contained' size='small' color='success' onClick={handleStartStop}>{gridDetails.running ? 'Pause' : 'Play'}</Button>
                    <Button variant='contained' size='small' color='error' sx={{ ml: 1 }} onClick={handleReset}>Reset</Button>
                    <Button variant='contained' size='small' sx={{ ml: 1 }} onClick={goHome}>Go To Home</Button>
                </Box>
                <Box className=" center" sx={{ my: 5, pb:3, display: 'flex', justifyContent: 'center' }}>
                    <Box className='borderedBox' sx={{ p: 0, borderRadius: 0 }}>
                        {gridDetails.cells?.map((row, x) => (
                            <div key={x} className="row">
                                {row?.map((cell, y) => (
                                    <Box
                                        key={`${x}-${y}`}
                                        className={`cell ${cell ? 'alive' : ''}`}
                                        onClick={() => toggleCell(x, y)}
                                        sx={{ width: `${gridDetails.cellSize}px`, height: `${gridDetails.cellSize}px` }}
                                    />
                                ))}
                            </div>
                        ))}
                    </Box>
                </Box>

                <Box className={'borderedGrid center'} sx={{ display: 'inline-block', py: 1, alignItems: 'center', width: '30%', cursor: 'pointer' }} onClick={() => handleOpen('size')}>
                    Grid Size Customizer
                </Box>
                <Box className={'borderedGrid center'} sx={{ display: 'inline-block', py: 1, alignItems: 'center', ml: 2, width: '30%', cursor: 'pointer' }} onClick={() => handleOpen('cell')}>
                    Cell Visual Customizer
                </Box>
            </Box>
            <AddGridComponent open={open} handleClose={() => setOpen(undefined)} GridDetails={gridDetails} addGrid={handleUpdate} />

        </div>
    );
}

export default Playground;
