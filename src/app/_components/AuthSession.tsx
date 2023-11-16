'use client';

import { getProviders, useSession } from 'next-auth/react';

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const AuthSession = () => {
  const { data: sessionData } = useSession();
  console.info({ sessionData });

  const [providers, setProviders] = useState<{ provider: string; linked: boolean }[]>();
  useEffect(() => {
    const init = async () => {
      if (sessionData) {
        const res1 = await getProviders();
        console.info(res1);
        let providers = Object.keys(res1 ?? {}).map((provider) => ({ provider, linked: false }));

        const res2 = await fetch('/api/auth/me');
        const { linkProviders, ...me } = await res2.json();

        providers = providers.map((info) => ({
          ...info,
          linked: linkProviders.some((e: string) => e === info.provider),
        }));

        console.info({ me });

        setProviders(providers);
      } else {
        console.info('No sessionData');
        const res1 = await getProviders();
        console.info(res1);
        let providers = Object.keys(res1 ?? {}).map((provider) => ({ provider, linked: false }));
        setProviders(providers);
      }
    };

    init();
  }, [sessionData]);

  return (
    <VStack>
      <Center flex={1} flexDir={'column'} pt={4}>
        <HStack>
          {providers ? (
            <VStack>
              {sessionData && (
                <Button onClick={() => signOut({ redirect: true })} _disabled={{ bgColor: 'gray' }}>
                  SingOut
                </Button>
              )}

              <HStack>
                {providers?.map((e) => (
                  <Button key={e.provider} isDisabled={e.linked} onClick={() => signIn(e.provider)}>
                    SignIn {e.provider.toUpperCase()}
                  </Button>
                ))}
              </HStack>
            </VStack>
          ) : (
            <HStack>
              <Button onClick={() => signIn()} _disabled={{ bgColor: 'gray' }}>
                SingIn
              </Button>
            </HStack>
          )}
        </HStack>
      </Center>
      <Box m='2' py='10'>
        {sessionData && (
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Td>Id</Td>
                  <Td>Name</Td>
                  <Td>Email</Td>
                  <Td>Expires</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{sessionData.user?.id}</Td>
                  <Td textAlign={'center'}>
                    <Flex justify={'center'} flexDir={'column'} align={'center'}>
                      <Image
                        src={sessionData.user?.image ?? ''}
                        alt={'avatar'}
                        width={'20'}
                        height={'20'}
                        rounded={'full'}
                      />
                      <Text>{sessionData.user?.name}</Text>
                    </Flex>
                  </Td>
                  <Td>{sessionData.user?.email}</Td>
                  <Td>{sessionData.expires}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </VStack>
  );
};
