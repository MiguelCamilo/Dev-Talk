import { IconType } from 'react-icons';

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

// icon: Icon is an alias
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-row items-center">
        {/* mobile first */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 cursor-pointer lg:hidden hover:bg-neutral-900">
        <Icon size={28} className='text-slate-200 hover:text-slate-300' />
      </div>

        {/* desktop first */}
      <div className='relative hidden lg:flex items-center gap-4 p-4 rounded-full cursor-pointer hover:bg-neutral-900'>
        <Icon 
            size={24}
            className='text-slate-200 hover:text-slate-300' 
        />
        <p className='hidden lg:block text-white text-gl'>{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
