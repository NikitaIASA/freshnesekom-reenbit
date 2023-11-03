import { useState, useEffect } from 'react';

export const useModal = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);

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

    return { isModalOpened, setIsModalOpened };
}
