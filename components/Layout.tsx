import Sidebar from '@/components/layout/Sidebar';
import Followbar from './layout/Followbar';
import MobileBar from './layout/Mobilebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-h-screen bg-[#16181c]">
      <div className="container h-full mx-auto max-w-[95rem]">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <Followbar />
        </div>
        <MobileBar />
      </div>
    </div>
  );
};

export default Layout;
