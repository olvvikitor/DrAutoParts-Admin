import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { RxPlus, RxMagnifyingGlass } from "react-icons/rx";
import TableModel from "../../components/table/TableModel";
import { Link } from "react-router"; // Corrigi a importação - deve ser react-router-dom
import { ModelContext } from "../../contexts/ModelContext";

export default function Model() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState(null); // Estado para armazenar resultados

    const { fetchModelByName, getModels, fetchModels } = useContext(ModelContext);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClear = () => {
        setSearchTerm(""); 
        setSearchResults(null);
        setIsFocused(false); 
        fetchModels(); 
    };

    const handleSearchClick = async () => {
        try {
            if (searchTerm.trim() === "") {
                setSearchResults(null);
                return;
            }

            const result = await fetchModelByName(searchTerm);
            console.log("Resultado da pesquisa:", result);

            // Garante que sempre seja um array
            const resultsArray = Array.isArray(result) ? result : [result];
            setSearchResults(resultsArray);

        } catch (error) {
            console.error("Erro na pesquisa:", error);
            setSearchResults([]); // Define como array vazio em caso de erro
        }
    };

    // Dados para a tabela - usa searchResults se existir, senão usa getModels
    const tableData = searchResults !== null ? searchResults : getModels || [];

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
                    <Link to="/model/create" onClick={() => { setError(null) }} className="flex items-center gap-3 my-5 curso-pointer"
                    >
                        <button
                            className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer"
                        >
                            <RxPlus size={20} />
                        </button>
                        <h3>Adicionar novo modelo</h3>
                    </Link>
                </motion.div>
                <div className="relative flex items-center mb-4 gap-2">
                    <button
                        className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border border-zinc-400 rounded-md p-2 cursor-pointer"
                        onClick={() => setIsFocused(!isFocused)}
                    >
                        <RxMagnifyingGlass size={20} />
                    </button>

                    <motion.input
                        type="text"
                        name="name"
                        value={searchTerm}
                        onChange={handleSearch}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: isFocused ? 180 : 0, opacity: isFocused ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        placeholder="Pesquisar modelo..."
                        className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                    />

                    <motion.button
                        onClick={handleSearchClick}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: isFocused ? 'auto' : 0,
                            opacity: isFocused ? 1 : 0,
                            paddingLeft: isFocused ? '0.75rem' : 0,
                            paddingRight: isFocused ? '0.75rem' : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`bg-sky-950 text-white rounded-md hover:bg-sky-900 transition overflow-hidden cursor-pointer ${isFocused ? 'py-2' : 'py-0'
                            }`}
                    >
                        {isFocused && "Pesquisar"}
                    </motion.button>

                    <motion.button
                        onClick={handleSearchClear}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: isFocused ? 'auto' : 0,
                            opacity: isFocused ? 1 : 0,
                            paddingLeft: isFocused ? '0.75rem' : 0,
                            paddingRight: isFocused ? '0.75rem' : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`bg-gray-500 text-white rounded-md hover:bg-gray-600 transition overflow-hidden cursor-pointer ${isFocused ? 'py-2' : 'py-0'
                            }`}
                    >
                        {isFocused && "Limpar"}
                    </motion.button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Passa os dados filtrados para a tabela */}
                    <TableModel data={tableData} />
                </motion.div>
            </div>
        </div>
    );
}