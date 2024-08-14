import { Spinner } from '@chakra-ui/react';

export default function SiteLoader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner size={'xl'} />
    </div>
  );
}
