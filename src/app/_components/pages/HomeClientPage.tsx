'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Center, Container, Flex, HStack, SimpleGrid, VStack, useMediaQuery } from '@chakra-ui/react';

import { AuthSession } from '../../_components/AuthSession';

export default function HomeClientPage({ resources }: { resources: any }) {
  // columns-1 sm:columns-2 xl:columns-3 2xl:columns-4
  const [is2XL] = useMediaQuery('(min-width: 1536px)');
  const [isXL] = useMediaQuery('(min-width: 1280px)');
  const [isSM] = useMediaQuery('(min-width: 640px)');
  const columns = is2XL ? 4 : isXL ? 3 : isSM ? 2 : 1;
  console.info({ columns });

  return (
    // main
    <Flex as='main' minH={'100vh'} flexDir={'column'} bgColor={'gray.50'} _dark={{ bgColor: 'gray.600' }}>
      {/* container */}
      <Container maxW={'container.md'}>
        <VStack columnGap={2}>
          <Center>
            <AuthSession />
          </Center>
          <HStack py={2}>
            <Link passHref href={'/post/category_1/1'}>
              <Button>Go To Post (Intersection @modal)</Button>
            </Link>
            <Link passHref href={'/dnd'}>
              <Button>Go To Dnd</Button>
            </Link>
          </HStack>
        </VStack>
      </Container>

      {/* @ts-ignore */}
      <SimpleGrid columns={columns} maxW={'1536px'} margin={'auto'} rowGap={'1'} columnGap={2}>
        {/* @ts-ignore */}
        {resources.map((row) => {
          // console.info({ row });
          // @ts-ignore
          return (
            <Box
              as='figure'
              key={row.asset_id}
              position={'relative'}
              transition={'all'}
              bg='gray.800'
              w='96'
              h='96'
              border={'1px solid'}
            >
              <Image
                key={row.asset_id}
                alt={'photo sample cloudinary'}
                // src={row.url}
                // @ts-ignore
                src={`https://res.cloudinary.com/dn27wvjci/image/upload/c_scale,w_360/${row.public_id}.${row.format}`}
                // style={{ transform: 'translate3d(0, 0, 0)' }}
                objectFit='cover'
                // placeholder='blur'
                // width={480}
                // height={480}
                fill
                sizes='(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw'
              />
            </Box>
          );
        })}
      </SimpleGrid>
      <Flex as='footer' height={'40'} p={2} bgColor={'gray.800'} color={'white'}>
        <Container>
          <Center>Footer</Center>
        </Container>
      </Flex>
    </Flex>
  );
}
