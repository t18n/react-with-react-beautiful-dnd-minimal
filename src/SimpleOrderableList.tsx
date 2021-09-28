import { useState } from 'react';
import faker from 'faker';
import { Droppable, Draggable, DragDropContext, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { arrayMoveImmutable } from 'array-move';

const tasks = Array(10).fill(0).map((_value, index) => ({
  id: `${index}-id`,
  content: faker.lorem.sentence()
}));

export default function SimpleOrderableList() {
  const [state, setState] = useState(tasks);

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

    setState(prevState => arrayMoveImmutable(prevState, source.index, destination.index));

    return;
  }

  useEffect(() => {
    console.table(state);
  }, [state]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"Items"}>
        {(droppableProvided: DroppableProvided) => (
          <div ref={droppableProvided.innerRef}>
            {state.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(draggableProvided: DraggableProvided) => (
                  <div
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    ref={draggableProvided.innerRef}
                  >
                    {task.content}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
