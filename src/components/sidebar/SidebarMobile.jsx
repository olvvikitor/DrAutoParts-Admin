import { AnimatePresence, motion } from "framer-motion";
import { RxDashboard, RxClipboardCopy, RxArchive, RxShare1, RxTransform, RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

export default function SidebarMobile({ isOpen, toggleSidebar }) {
    // Mapeamento dos itens do menu com seus respectivos ícones
    const menuItems = [
        { path: "/home", label: "Dashboard", icon: <RxDashboard size={20} /> },
        { path: "/product", label: "Produtos", icon: <RxArchive size={20} /> },
        { path: "/category", label: "Categorias", icon: <RxShare1 size={20} /> },
        { path: "/model", label: "Modelos", icon: <RxTransform size={20} /> },
        { path: "/supplier", label: "Fornecedores", icon: <RxClipboardCopy size={20} /> },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6"
                >
                    <div className="flex justify-end">
                        <button onClick={toggleSidebar} className="text-zinc-700 dark:text-zinc-300">
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <nav className="mt-6">
                        <ul className='text-zinc-700 text-lg font-semibold dark:text-zinc-300'>
                            {menuItems.map((item) => (
                                <li key={item.path} className="flex items-center gap-3 py-2">
                                    {item.icon}
                                    <Link to={item.path} onClick={toggleSidebar}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}