import { create } from 'zustand';

interface FollowersModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// custom hook to handle loginModal
const useFollowersModal = create<FollowersModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useFollowersModal