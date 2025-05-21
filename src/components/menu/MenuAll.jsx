import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxClipboardCopy, RxArchive, RxShare1, RxTransform, RxLayout } from "react-icons/rx";
import { ProductContext } from "../../contexts/ProductContext";
import { SupplierContext } from "../../contexts/SupplierContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ModelContext } from "../../contexts/ModelContext";
import { Link } from "react-router";

export default function MenuAll() {

    const {getProducts} = useContext(ProductContext); 
    const {getSuppliers} = useContext(SupplierContext); 
    const {getCategories} = useContext(CategoryContext); 
    const {getModels} = useContext(ModelContext); 

    
    // Array de objetos para os itens do menu
    const items = [
        { icon: <RxArchive size={24} />, title: "Produtos", count: getProducts.length, to: "/product" },
        { icon: <RxShare1 size={24} />, title: "Categorias", count: getCategories.length, to: "/category" },
        { icon: <RxTransform size={24} />, title: "Modelos", count: getModels.length, to: "/model" },
        { icon: <RxClipboardCopy size={24} />, title: "Fornecedores", count: getSuppliers.length, to: "/supplier" },
        { icon: <RxLayout size={24} />, title: "Carrossel", count: getSuppliers.length, to: "/carousel" },
    ];

    // Variantes de animação para os itens
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }, 
    };

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
            <AnimatePresence>
                {items.map((item, index) => (
                    <Link to={item.to} key={index}> 
                        <motion.div
                            initial="hidden"
                            animate="visible" 
                            variants={itemVariants} 
                            transition={{ delay: index * 0.1, duration: 0.1 }} 
                            whileHover={{ scale: 1.07 }} 
                            className="flex flex-col justify-around bg-white dark:bg-gray-800/30 p-4 rounded-xl border border-zinc-300 dark:border-zinc-500 transition hover:shadow-xl cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }} 
                                className="flex items-center justify-center w-12 h-12 bg-zinc-200/40 dark:bg-zinc-500/50 text-zinc-700 dark:text-zinc-300 rounded-lg mb-2"
                            >
                                {item.icon}
                            </motion.div>
                            <div className="text-start text-zinc-500 dark:text-zinc-400">
                                <h2 className="text-sm font-semibold">{item.title}</h2>
                                {/* <p className="text-lg text-zinc-800 dark:text-zinc-300">{item.count}</p> */}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </AnimatePresence>
        </section>
    );
}