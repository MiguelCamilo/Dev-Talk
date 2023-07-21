import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';

interface SidebarItemProps {
  label: string;
  href?: string;
  auth?: boolean;
  icon: IconType;
  onClick?: () => void;
}

// icon: Icon is an alias
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  auth,
  icon: Icon,
  onClick
}) => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const { data: currentUser } = useCurrentUser()

    // this handles the sidebar navigation items
    // each item has an href that is passed down to the sidebar item comp
    const handleClick = useCallback(() => {
      if(onClick){
        return onClick()
      }

      // if route is protected and !currentUser then openModal
      if(auth && !currentUser) {
        loginModal.onOpen()
      } else if (href) {
        router.push(href)
      }

    },[onClick, href, router, currentUser, auth, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
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
