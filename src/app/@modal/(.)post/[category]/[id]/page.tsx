'use client';

import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function PostModal() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal isOpen={true} onClose={() => undefined} size={'2xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Center flexDir={'column'}>
            <Text>{pathname}</Text>
            <Image src='https://source.unsplash.com/Qe3kgY98OXs' width={500} height={500} alt='Picture of the author' />
          </Center>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button onClick={() => router.back()}>Back</Button>
          <Button onClick={() => location.assign(pathname)}>Detail</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
