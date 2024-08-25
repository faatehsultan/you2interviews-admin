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
  Skeleton,
  IconButton,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';

export type ColumnProps = {
  key: string;
  label: string;
  width?: string | number;
};

export default function Table({
  columns = [],
  data = [],
  title = '',
  newButton = false,
  newButtonTitle = 'Add New',
  newButtonOnClick = () => {},
  loading = false,
  showActions = false,
}: {
  columns?: ColumnProps[];
  data?: any[];
  title?: string;
  newButton?: boolean;
  newButtonTitle?: string;
  newButtonOnClick?: () => void;
  loading?: boolean;
  showActions?: boolean;
}) {
  const validColumns = useMemo(() => {
    return [
      ...columns,
      ...(showActions ? [{ key: 'actions', label: 'Actions' }] : []),
    ];
  }, [columns, showActions]);

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
            {validColumns.map((column, idx) => (
              <Th key={idx} width={column.width}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {(data || Array(10)).map((row, idx) => (
            <Tr key={idx}>
              {validColumns.map((column, idx) =>
                column.key == 'actions' ? (
                  <Td className="flex gap-2" key={idx}>
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
                  </Td>
                ) : (
                  <Td key={idx} width={column.width}>
                    {loading ? (
                      <Skeleton height="20px" isLoaded />
                    ) : (
                      row[column.key] ?? '-'
                    )}
                  </Td>
                ),
              )}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
