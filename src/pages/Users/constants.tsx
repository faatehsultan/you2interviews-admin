import { Icon, IconButton } from '@chakra-ui/react';
import { BsPencil, BsTrash } from 'react-icons/bs';

export const USER_LISTING_COLUMNS = ['uid', 'displayName', 'email', 'actions'];

export const generateDummyUsers = (num: number) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      uid: `${i + 1}`,
      displayName: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      actions: (
        <div className="flex gap-2">
          <IconButton
            icon={<Icon as={BsPencil} />}
            aria-label="edit"
            size="xs"
            color="white"
            backgroundColor="blue.400"
            _hover={{ backgroundColor: 'blue.600' }}
          />
          <IconButton
            icon={<Icon as={BsTrash} />}
            aria-label="delete"
            size="xs"
            color="white"
            backgroundColor="red.400"
            _hover={{ backgroundColor: 'red.600' }}
          />
        </div>
      ),
    });
  }
  return data;
};
