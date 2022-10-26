import { useEffectLayout } from "./useEffectLayout"
import { useMountedEffect } from "./useMountedEffect";
import { useStorage } from "./useStorage";

export const useTheme = () => {
    const [theme, setTheme] = useStorage("theme", "light")
    useEffectLayout(() => {
        if (document && !theme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
                .matches;
            setTheme(p => prefersDark ? "dark" : "light")
            document.documentElement.setAttribute(
                "data-theme", theme
            );
        }
    }, [])
    useMountedEffect(() => {
        if (document) {
            document.documentElement.setAttribute(
                "data-theme", theme
            );
        }
    }, [theme])
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }
    return { toggleTheme, theme }
}