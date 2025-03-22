import { useState } from "react";
import { motion } from "framer-motion";
import { RxPlus, RxMagnifyingGlass  } from "react-icons/rx";
import TableSupplier from "../../components/table/TableSupplier";
import { Link } from "react-router";

export default function Supplier() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="p-2">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Fornecedores
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/supplier/create" className="flex items-center gap-3 my-5 curso-pointer">
                        <button className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer">
                            <RxPlus size={20} />
                        </button>
                        <h3>Adicionar novo fornecedor</h3>
                    </Link>
                </motion.div>

                <div className="relative flex items-center mb-4">
                    {/* Ícone de Pesquisa */}
                    <button
                        className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border border-zinc-400 rounded-md p-2 cursor-pointer"
                        onClick={() => setIsFocused(!isFocused)}
                    >
                        <RxMagnifyingGlass size={20} />
                    </button>

                    {/* Input com Animação */}
                    <motion.input
                        type="text"
                        name="name"
                        value={searchTerm}
                        onChange={handleSearch}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: isFocused ? 180 : 0, opacity: isFocused ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        placeholder="Pesquisar fornecedor..."
                        className="ml-2 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <TableSupplier searchTerm={searchTerm} />
                </motion.div>
            </div>
        </div>
    );
}
