'use client';

import { Flex, Heading } from '@chakra-ui/react';

import { SortableContainer } from '../SortableContainer';

export const DndClinetPage = () => {
  return (
    <Flex as='main' minH={'100vh'} flexDir={'column'}>
      {/* container */}
      <Flex flex={1} bgColor={'gray.300'} _dark={{ bgColor: 'gray.600' }} flexDir={'column'}>
        <Heading>Dnd Kit Toy</Heading>

        {/* @ts-ignore */}
        {[...Array(30).keys()].map((r, i) => (
          <SortableContainer key={i.toString()} />
        ))}
      </Flex>
    </Flex>
  );
};
