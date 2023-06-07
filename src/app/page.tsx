'use client';

import { Box, Button, Center, Container, Flex, Heading, HStack, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthSession } from './_components/AuthSession';

export default function Home() {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // main
    <Flex as='main' minH={'100vh'} flexDir={'column'}>
      {/* header */}
      <Box as={'header'} bgColor={'gray.800'} p={2}>
        <Container maxW={'container.lg'}>
          <HStack>
            <Heading color={'#fff'} fontSize={'2xl'} flexGrow={1}>
              Nextjs + Auth.js
            </Heading>
            <Text color={'#fff'}>{colorMode}</Text>
            <Button onClick={toggleColorMode}>Change</Button>
          </HStack>
        </Container>
      </Box>

      {/* container */}
      <Flex flex={1} bgColor={'gray.300'} _dark={{ bgColor: 'gray.600' }}>
        <Container maxW={'container.md'}>
          <AuthSession />

          <Center>
            <Link passHref href={'/post/1'}>
              <Button>Go To Post</Button>
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
