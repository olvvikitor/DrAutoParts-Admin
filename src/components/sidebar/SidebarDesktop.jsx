import React from 'react';
import { RxDashboard, RxClipboardCopy, RxArchive, RxShare1, RxTransform } from "react-icons/rx";
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/logo.png";

const SidebarDesktop = ({ isOpen }) => {
    const menuItems = [
        { icon: <RxDashboard size={20} />, text: "Dashboard", to: "/home" },
        { icon: <RxArchive size={20} />, text: "Produtos", to: "/product" },
        { icon: <RxShare1 size={20} />, text: "Categorias", to: "/category" },
        { icon: <RxTransform size={20} />, text: "Modelos", to: "/model" },
        { icon: <RxClipboardCopy size={20} />, text: "Fornecedores", to: "/supplier" },
    ];

    return (
        <div className={`flex ${isOpen ? 'w-60' : 'w-20'} h-[100vh] bg-white transition-all duration-600 dark:bg-gray-900`}>
            <div className="flex flex-col w-full">
                <div className="p-2 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                    {/* <span className="text-lg font-semibold hover:cursor-pointer">Hooks</span> */}
                    <img src={logo} alt="logo" className={`${ isOpen ? 'size-[80%]' : 'size-[100%]'}`}/>
                </div>
                <div className="flex flex-col p-4">
                    <ul className='text-zinc-700 text-sm font-semibold dark:text-zinc-300'>
                        {menuItems.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <motion.li
                                    className={`flex items-center justify-start mb-2 rounded-md cursor-pointer p-2 ${isOpen ? 'hover:bg-zinc-100 dark:hover:bg-zinc-500/25' : ''}`}
                                    whileHover={{ scale: isOpen ? 1.05 : 1.10 }}
                                >
                                    <motion.div animate={{ x: isOpen ? 0 : -10 }} transition={{ type: "spring", stiffness: 100 }}>
                                        {item.icon}
                                    </motion.div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="ml-4"
                                            >
                                                {item.text}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SidebarDesktop