import { handleDrop } from "./Table";

describe('handleDrop', () => {
  let event;
  let rows;
  let setRows;
  let setDraggingIndex;
  let setHoverIndex;

  beforeEach(() => {
    event = { preventDefault: jest.fn() };
    rows = [
      { name: 'Alice', age: 25, location: 'New York' },
      { name: 'Bob', age: 30, location: 'San Francisco' },
      { name: 'Charlie', age: 35, location: 'Los Angeles' },
    ];
    setRows = jest.fn();
    setDraggingIndex = jest.fn();
    setHoverIndex = jest.fn();
  });

  test('should prevent default behavior', () => {
    handleDrop(event, 0, 1, rows, setRows, setDraggingIndex, setHoverIndex);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should do nothing if draggingIndex or hoverIndex is null', () => {
    handleDrop(event, null, 1, rows, setRows, setDraggingIndex, setHoverIndex);
    expect(setRows).not.toHaveBeenCalled();
    handleDrop(event, 0, null, rows, setRows, setDraggingIndex, setHoverIndex);
    expect(setRows).not.toHaveBeenCalled();
  });

  test('should update rows correctly', () => {
    handleDrop(event, 0, 1, rows, setRows, setDraggingIndex, setHoverIndex);
    const updatedRows = [
      { name: 'Bob', age: 30, location: 'San Francisco' },
      { name: 'Alice', age: 25, location: 'New York' },
      { name: 'Charlie', age: 35, location: 'Los Angeles' },
    ];
    expect(setRows).toHaveBeenCalledWith(updatedRows);
  });

  test('should reset draggingIndex and hoverIndex to null', () => {
    handleDrop(event, 0, 1, rows, setRows, setDraggingIndex, setHoverIndex);
    expect(setDraggingIndex).toHaveBeenCalledWith(null);
    expect(setHoverIndex).toHaveBeenCalledWith(null);
  });
});