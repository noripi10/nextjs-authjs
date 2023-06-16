'use client';

import { Box, Button, Container, Heading, HStack, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { ViewSource } from './view-source';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as={'header'} bgColor={'gray.800'} p={2} position={'sticky'} top={0}>
      <Container maxW={'container.lg'}>
        <HStack>
          <Heading color={'#fff'} fontSize={'2xl'} flexGrow={1}>
            <Link passHref href={'/'}>
              Nextjs + Auth.js
            </Link>
          </Heading>
          <Text color={'#fff'}>{colorMode}</Text>
          <Button onClick={toggleColorMode}>Change</Button>
        </HStack>
      </Container>

      <ViewSource linkUrl='https://github.com/noripi10' />
    </Box>
  );
};
