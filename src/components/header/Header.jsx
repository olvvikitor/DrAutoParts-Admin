import { RxActivityLog, RxSun, RxMoon, RxExit } from "react-icons/rx";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router";

export default function Header ({ toggleSidebar }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex flex-wrap justify-between items-center bg-white p-3 dark:bg-gray-900 transition-all duration-600">
        <button 
            onClick={toggleSidebar} 
            className="border border-zinc-400 rounded-xl p-2 cursor-pointer dark:text-white">
            <RxActivityLog size={20} />
        </button>
        <div className="flex gap-2 dark:text-white mt-2 sm:mt-0">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-zinc-400 dark:border-zinc-600 cursor-pointer">
                {theme === "dark" ? <RxSun size={20} /> : <RxMoon size={20} />}
            </button>
            <Link to="/">
                <button className="border border-zinc-400 rounded-xl p-2 cursor-pointer">
                    <RxExit size={20} />
                </button>
            </Link>
        </div>
    </div>
    
    );
};