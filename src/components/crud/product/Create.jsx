import { motion } from "framer-motion";

export default function Create({ onClose }) {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Fundo escurecido e borrado */}
            <div
                className="fixed inset-0 bg-black/25 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal centralizado */}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative z-50"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-300">
                    Adicionar Novo Produto
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Nome do Produto
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            placeholder="Digite o nome do produto"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Preço
                        </label>
                        <input
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            placeholder="Digite o preço"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}