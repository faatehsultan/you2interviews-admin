import {
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useCache } from '../../../redux/hooks';
import { CacheKeys } from '../../../redux/enums';

export default function Drawer() {
  const drawerCache: any = useCache(CacheKeys.DRAWER_DATA);
  const { isOpen, onClose } = useDisclosure({
    isOpen: !!drawerCache.value,
  });

  const handleCancel = () => {
    onClose();
    drawerCache.set(undefined);
  };

  const handleSubmit = () => {
    // TODO add submit logic here
  };

  return (
    <ChakraDrawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{drawerCache?.value?.title}</DrawerHeader>

        <DrawerBody>{drawerCache?.value?.form}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}
