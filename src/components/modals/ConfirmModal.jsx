import { motion } from "framer-motion";

export default function ConfirmModal({ onClose, onConfirm, titleConfirm, textConfirm, titleButton }) {
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md relative z-50"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-300">
                    {titleConfirm}
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                    {textConfirm}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                    >
                        {titleButton}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}