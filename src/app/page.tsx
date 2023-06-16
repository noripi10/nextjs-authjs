'use client';

import { Button, Center, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { AuthSession } from './_components/AuthSession';

export default function Home() {
  return (
    // main
    <Flex as='main' minH={'100vh'} flexDir={'column'}>
      {/* container */}
      <Flex flex={1} bgColor={'gray.300'} _dark={{ bgColor: 'gray.600' }}>
        <Container maxW={'container.md'}>
          <AuthSession />

          <Center flexDir={'column'} gap={2}>
            <Link passHref href={'/post/category_1/1'}>
              <Button>Go To Post (Intersection @modal)</Button>
            </Link>
            <Link passHref href={'/dnd'}>
              <Button>Go To Dnd</Button>
            </Link>
          </Center>
        </Container>
      </Flex>

      <Flex as='footer' height={'40'} p={2} bgColor={'gray.800'} color={'white'}>
        <Container>
          <Center>Footer</Center>
        </Container>
      </Flex>
    </Flex>
  );
}
