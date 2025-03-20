import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

export default function SidebarMobile ({ isOpen, toggleSidebar }) {
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
                            <li><Link to="/home" onClick={toggleSidebar}>Dashboard</Link></li>
                            <li><Link to="/product" onClick={toggleSidebar}>Produtos</Link></li>
                            <li><Link to="/categorie" onClick={toggleSidebar}>Categorias</Link></li>
                            <li><Link to="/model" onClick={toggleSidebar}>Modelos</Link></li>
                            <li><Link to="/supplier" onClick={toggleSidebar}>Fornecedores</Link></li>
                        </ul>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};