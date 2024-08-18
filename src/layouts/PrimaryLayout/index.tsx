import Drawer from '../../components/molecules/Drawer';
import Sidebar from '../../components/molecules/Sidebar';

export default function PrimaryLayout({ children }: any) {
  return (
    <>
      <div className="fixed md:block hidden z-20">
        <Sidebar />
      </div>
      <main className="md:pl-64 w-screen p-2">{children}</main>
      <Drawer />
    </>
  );
}
