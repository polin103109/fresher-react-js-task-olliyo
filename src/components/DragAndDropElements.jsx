import React, { useState } from 'react';

function DragAndDropElements ()  {
    const [draggedElement, setDraggedElement] = useState(null);
    const [items, setItems] = useState([
      { id: 'A', text: 'Item A' },
      { id: 'B', text: 'Item B' },
      { id: 'C', text: 'Item C' },
    ]);
  

  return (
    <div className="container">
      {items.map((item) => (
        <div
          key={item.id}
          className="box"
         
        >
          {item.text}
        </div>
      )
    )}
    </div>
  )
};

export default DragAndDropElements
