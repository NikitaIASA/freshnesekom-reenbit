import { useState, useEffect } from 'react';

export const useModal = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const openModal = () => setIsModalOpened(true);

    const closeModal = () => setIsModalOpened(false);

    useEffect(() => {
        if (isModalOpened) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [isModalOpened]);

    return { isModalOpened, openModal, closeModal };
}
