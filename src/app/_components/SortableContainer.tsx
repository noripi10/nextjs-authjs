'use client';

import { Box, Center, HStack, VStack } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

type ItemProp = {
  id: string;
  name: string;
  overlay?: boolean;
};

const generateItems = (range: number) => {
  // @ts-ignore
  return [...Array(range).keys()].map((e, i) => ({
    id: (+i).toString(),
    name: `name_${(+i).toString()}`,
  }));
};

const SortItem: FC<ItemProp> = ({ id, name, overlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '0.5rem 1rem',
    marginBottom: '0.5rem',
    cursor: 'move',
    listStyle: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: !overlay && isDragging ? 0.3 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      w={'24'}
      h={'24'}
      borderRadius={8}
      bgColor={'blue.50'}
      color={'blackAlpha.800'}
    >
      {id} {name}
    </Box>
  );
};

export const SortableContainer = () => {
  const sensers = useSensors(
    useSensor(PointerSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {})
  );

  const [items, setItems] = useState(generateItems(20));

  const observerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(observerRef, { once: true });

  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const acitveItem = useMemo(() => {
    if (!activeId) {
      return null;
    }
    return items.find((e) => e.id === activeId);
  }, [activeId, items]);

  // const [inView, setInView] = useState(false);
  // useEffect(() => {
  //   if (!observerRef.current) {
  //     return;
  //   }

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       for (let entry of entries) {
  //         if (entry.isIntersecting) {
  //           setTimeout(() => setInView(true), 100);
  //         } else {
  //           setInView(false);
  //         }
  //       }
  //     },
  //     {
  //       rootMargin: '0px',
  //     }
  //   );

  //   observer.observe(observerRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <div ref={observerRef}>
      {isInView && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <Box p={'4'}>
            <DndContext
              sensors={sensers}
              collisionDetection={rectIntersection}
              onDragStart={(e) => {
                setActiveId(e.active.id);
              }}
              onDragEnd={(e) => {
                const activeIndex = e.active.id;
                const overIndex = e.over?.id;

                if (!overIndex || activeIndex === overIndex) {
                  return;
                }

                setItems((prev) => {
                  const oldIndex = prev.findIndex((e) => e.id === activeIndex.toString());
                  const newIndex = prev.findIndex((e) => e.id === overIndex.toString());

                  return arrayMove(prev, oldIndex, newIndex);
                });
              }}
            >
              <SortableContext items={items} strategy={horizontalListSortingStrategy}>
                <Center flexDir={'column'}>
                  <HStack overflow={'auto'} w={'90%'}>
                    {items.map((item) => (
                      <SortItem key={item.id} id={item.id} name={item.name} />
                    ))}
                  </HStack>
                </Center>
              </SortableContext>

              <DragOverlay>
                {activeId && acitveItem && <SortItem id={acitveItem.id} name={acitveItem.name} overlay />}
              </DragOverlay>
            </DndContext>
          </Box>
        </motion.div>
      )}

      {/* <Box p={'4'}>
        <DndContext
          sensors={sensers}
          collisionDetection={rectIntersection}
          onDragStart={(e) => {
            setActiveId(e.active.id);
          }}
          onDragEnd={(e) => {
            const activeIndex = e.active.id;
            const overIndex = e.over?.id;

            if (!overIndex || activeIndex === overIndex) {
              return;
            }

            setItems((prev) => {
              const oldIndex = prev.findIndex((e) => e.id === activeIndex.toString());
              const newIndex = prev.findIndex((e) => e.id === overIndex.toString());

              return arrayMove(prev, oldIndex, newIndex);
            });
          }}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Center flexDir={'column'}>
              <VStack overflow={'auto'} w={'90%'}>
                {items.map((item) => (
                  <SortItem key={item.id} id={item.id} name={item.name} />
                ))}
              </VStack>
            </Center>
          </SortableContext>

          <DragOverlay>{activeId && acitveItem && <SortItem id={acitveItem.id} name={acitveItem.name} />}</DragOverlay>
        </DndContext>
      </Box> */}
    </div>
  );
};
