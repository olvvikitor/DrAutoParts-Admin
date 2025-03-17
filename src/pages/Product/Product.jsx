import { motion } from "framer-motion";
import { RxPlus } from "react-icons/rx";
import useToggle from "../../hooks/useToggle";
import TableProduct from "../../components/table/TableProduct";
import Create from "../../components/crud/product/Create";

export default function Product() {
    const [active, toggleAction] = useToggle();

    return (
        <div className="p-2">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Produtos
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <motion.div
                    className="flex items-center gap-3 my-5 curso-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={toggleAction}
                        className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer"
                    >
                        <RxPlus size={20} />
                    </button>
                    <h3>Adicionar novo produto</h3>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <TableProduct />
                </motion.div>
            </div>

            {/* Modal Create */}
            {active && <Create onClose={toggleAction} />}
        </div>
    );
}