import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Icon,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

export default function Table({
  columns = [],
  data = [],
  title = '',
  newButton = false,
  newButtonTitle = 'Add New',
  newButtonOnClick = () => {},
}: {
  columns?: any[];
  data?: any[];
  title?: string;
  newButton?: boolean;
  newButtonTitle?: string;
  newButtonOnClick?: () => void;
}) {
  return (
    <TableContainer>
      <div className="flex gap-5 justify-between items-center fixed bg-white w-screen md:pl-72 z-10 top-0 left-0 px-8">
        {title && <div className="text-2xl my-5 font-bold">{title}</div>}
        {newButton && (
          <Button
            onClick={newButtonOnClick}
            className="w-full text-2xl my-5 font-bold"
            size="sm"
            colorScheme="blue"
            variant="solid"
            rightIcon={<Icon as={BsPlus} />}
            width="fit-content"
          >
            {newButtonTitle}
          </Button>
        )}
      </div>
      <ChakraTable variant="striped" className="mt-16">
        <Thead>
          <Tr>
            {columns.map((column, idx) => (
              <Th key={idx}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, idx) => (
            <Tr key={idx}>
              {columns.map((column, idx) => (
                <Td key={idx}>{row[column]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
