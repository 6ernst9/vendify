import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {storeSelect} from "../core/store/selectors";

const useInjectTheme = () => {
    const theme = useSelector(storeSelect.theme);

    useEffect(() => {
        if (!theme) return;

        const root = document.documentElement;

        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--background-color', theme.backgroundColor);
        root.style.setProperty('--font-family', theme.font);
        root.style.setProperty('--title-color', theme.titleColor);
        root.style.setProperty('--text-secondary-color', theme.textSecondaryColor);
        root.style.setProperty('--button-radius', theme.buttonRadius);
        root.style.setProperty('--navbar-bg',
            theme.navbarStyle === 'blur' ? 'rgba(255, 255, 255, 0.6)' : theme.backgroundColor
        );
        root.style.setProperty('--navbar-blur',
            theme.navbarStyle === 'blur' ? 'blur(12px)' : 'blur(0px)'
        );

    }, [theme]);
};

export default useInjectTheme;
