import React, { useEffect, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Dashboard({ grids, removeGrid, addGrid, setGridDetails }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log('clodes');
    };

    return (
        <>
            <h2>Dashboard</h2>
            <Box className="borderedBox center" >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    {grids.map((grid, index) => (
                        <Box key={index} className={'borderedGrid'} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: '40%', justifyContent: 'space-between' }} onClick={() => setGridDetails(grid)}>
                            {grid.name.substring(0, 30)}{grid.name.length > 30 ? '...' : ''}
                            <IconButton onClick={(e) => removeGrid(e, index)} ><Delete fontSize="small" /></IconButton>
                        </Box>
                    ))}
                </Box >

                <Button variant='outlined' onClick={handleClickOpen} startIcon={<Add />} size='large' >Add More</Button>
            </Box>
            <AddGridComponent open={open} handleClose={handleClose} addGrid={addGrid} />
        </>
    );
}

export default Dashboard;

export const AddGridComponent = ({ handleClose, open, GridDetails, addGrid }) => {
    const [gridName, setGridName] = useState(GridDetails?.name || '');
    const [gridSize, setGridSize] = useState(GridDetails?.size || 10);
    const [cell, setCell] = useState(GridDetails?.cellSize || 20);

    console.log(GridDetails, 'GridDetails038497386587657823');
    useEffect(() => {
        setGridName(GridDetails?.name || '')
        setGridSize(GridDetails?.size || 10)
        setCell(GridDetails?.cellSize || 20)
    }, [GridDetails])

    const handleAddGrid = () => {
        if (gridName.trim() !== '') {
            addGrid(gridName, gridSize, cell);
            setGridName('');
            setGridSize(10)
            setCell(20)
            handleClose()
        } else {
            alert('Please enter a grid name');
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'xs'}
            fullWidth
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>{GridDetails ? 'Update' : 'Add'} Grid</DialogTitle>
            <DialogContent>
                {open !== 'size' && open !== 'cell' &&
                    <TextField value={gridName} onChange={(e) => setGridName(e.target.value)} margin="dense" id="outlined-basic" label="Grid Name" size='small' variant="outlined" autoFocus required fullWidth sx={{ my: 3 }} />
                }
                {open !== 'name' && open !== 'cell' && <TextField type='number' value={gridSize} onChange={(e) => setGridSize(e.target.value)} margin="dense" id="outlined-basic" label="Grid Size" size='small' variant="outlined" required fullWidth sx={{ mb: 3 }} />}
                {open === 'cell' && <TextField type='number' value={cell} onChange={(e) => setCell(e.target.value)} margin="dense" id="outlined-basic" label="Cell Size" size='small' variant="outlined" fullWidth InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                <Button disabled={!gridName} variant='contained' onClick={handleAddGrid}>{GridDetails ? ' Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

