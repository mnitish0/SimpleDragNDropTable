/**
 * Description: Table Component with Draggable features.
 *
 * Author: Nitish Mehta
 * Email: mnitish0@gmail.com
 * LinkedIn: https://au.linkedin.com/in/nitish-mehta-software-developer
 */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

/**
 * Handles the drop event for reordering rows in a drag-and-drop interface.
 * 
 * @param {Object} event - The drop event object.
 * @param {number} draggingIndex - The index of the currently dragging element.
 * @param {number} hoverIndex - The index of the element where the dragging element is ready to drop.
 * @param {Array} rows - The array of rows to be reordered.
 * @param {Function} setRows - Function to update the rows state.
 * @param {Function} setDraggingIndex - Function to update the dragging index state.
 * @param {Function} setHoverIndex - Function to update the hover index state.
 * 
 * @returns {void}
 * Export is required for testing, check ./Table.test.js
 */
export const handleDrop = (event, draggingIndex, hoverIndex, rows, setRows, setDraggingIndex, setHoverIndex) => {
  event.preventDefault();
  if (draggingIndex !== null && hoverIndex !== null) {
    const updatedRows = [...rows];
    // remove current draggableIndex from rows and updated it into new position
    const [draggedItem] = updatedRows.splice(draggingIndex, 1);
    updatedRows.splice(hoverIndex, 0, draggedItem);
    setRows(updatedRows);
    setDraggingIndex(null);
    setHoverIndex(null);
  }
};

const BasicTable = ({ rows, setRows }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  // when dragging is started
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // dragging with which element
  const handleDragOver = (event, index) => {
    event.preventDefault();
    setHoverIndex(index);
  };

  // when dragging is end
  const handleDragEnd = () => {
    setDraggingIndex(null);
    setHoverIndex(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="people table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={(event) => handleDrop(event, draggingIndex, hoverIndex, rows, setRows, setDraggingIndex, setHoverIndex)}
              onDragEnd={handleDragEnd}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                opacity: draggingIndex === index ? 0.5 : 1,
                backgroundColor: hoverIndex === index ? 'lightgray' : 'inherit',
              }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
