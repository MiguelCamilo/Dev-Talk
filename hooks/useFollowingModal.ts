import { create } from 'zustand';

interface FollowingModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// custom hook to handle loginModal
const useFollowingModal = create<FollowingModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useFollowingModal