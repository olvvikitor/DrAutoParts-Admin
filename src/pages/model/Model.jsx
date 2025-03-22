import { motion } from "framer-motion";
import { RxPlus } from "react-icons/rx";
import TableModel from "../../components/table/TableModel";
import { Link } from "react-router";

export default function Supplier() {

    return (
        <div className="p-2">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Modelos
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/model/create" className="flex items-center gap-3 my-5 curso-pointer"
                    >
                        <button
                            className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer"
                        >
                            <RxPlus size={20} />
                        </button>
                        <h3>Adicionar novo modelo</h3>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <TableModel />
                </motion.div>
            </div>

        </div>
    );
}