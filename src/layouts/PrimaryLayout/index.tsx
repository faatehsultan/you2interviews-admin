import Sidebar from '../../components/molecules/Sidebar';

export default function PrimaryLayout({ children }: any) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
