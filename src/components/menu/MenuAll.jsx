import { motion, AnimatePresence } from "framer-motion"; // Importe Framer Motion
import { RxClipboardCopy, RxArchive, RxShare1, RxTransform } from "react-icons/rx";
import { Link } from "react-router"; // Importe o Link do react-router-dom

export default function MenuAll() {
    // Array de objetos para os itens do menu
    const items = [
        { icon: <RxArchive size={24} />, title: "Produtos", count: 324, to: "/product" },
        { icon: <RxShare1 size={24} />, title: "Categorias", count: 324, to: "/categorias" },
        { icon: <RxTransform size={24} />, title: "Modelos", count: 324, to: "/modelos" },
        { icon: <RxClipboardCopy size={24} />, title: "Fornecedores", count: 324, to: "/fornecedores" },
    ];

    // Variantes de animação para os itens
    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Estado inicial (escondido)
        visible: { opacity: 1, y: 0 }, // Estado final (visível)
    };

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <AnimatePresence>
                {items.map((item, index) => (
                    <Link to={item.to} key={index}> {/* Envolve o motion.div com Link */}
                        <motion.div
                            initial="hidden" // Estado inicial da animação
                            animate="visible" // Estado final da animação
                            variants={itemVariants} // Variantes de animação
                            transition={{ delay: index * 0.1, duration: 0.1 }} // Atraso e duração da animação
                            whileHover={{ scale: 1.07 }} // Animação ao passar o mouse
                            className="flex flex-col justify-around bg-white dark:bg-gray-800/30 p-4 rounded-xl border border-zinc-300 dark:border-zinc-500 transition hover:shadow-xl cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }} // Animação de hover no ícone
                                className="flex items-center justify-center w-12 h-12 bg-zinc-200/40 dark:bg-zinc-500/50 text-zinc-700 dark:text-zinc-300 rounded-lg mb-2"
                            >
                                {item.icon}
                            </motion.div>
                            <div className="text-start text-zinc-500 dark:text-zinc-400">
                                <h2 className="text-sm font-semibold">{item.title}</h2>
                                <p className="text-lg text-zinc-800 dark:text-zinc-300">{item.count}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </AnimatePresence>
        </section>
    );
}