import { create } from 'zustand';

interface EditModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// custom hook to handle loginModal
const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useEditModal