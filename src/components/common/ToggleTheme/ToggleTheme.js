import { useEffectLayout, useTheme } from '@hooks';
import cn from 'classnames';
import { useState } from 'react';
import s from "./ToggleTheme.module.scss";

const PREFIX = "toggle-theme";

export const ToggleTheme = () => {
    const { toggleTheme, theme } = useTheme();
    const [_theme, setTheme] = useState("dark");

    useEffectLayout(() => {
        setTheme(theme);
    }, [theme]);

    return <div
        onClick={toggleTheme}
        className={cn(s[`${PREFIX}`], {
            [s[`${PREFIX}--dark`]]: _theme === "dark",
        })}
    >
        <div></div>
    </div>
}