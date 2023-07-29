import Sidebar from '@/components/layout/Sidebar';
import Followbar from './layout/Followbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-[#16181c]">
      <div className="container h-full mx-auto max-w-[86rem]">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <Followbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
