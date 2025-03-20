import { motion } from "framer-motion";
import { RxCheck  } from "react-icons/rx"; // Ícone de sucesso

export default function SucessModal({ titleSucess, textSucess }) {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Fundo escurecido e borrado */}
            <div className="fixed inset-0 bg-black/25 bg-opacity-50 backdrop-blur-sm"></div>

            {/* Modal centralizado */}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md relative z-50 flex flex-col items-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >

                {/* Texto de sucesso */}
                <h2 className="text-xl font-semibold text-center text-zinc-700 dark:text-zinc-300 mb-6">
                    {titleSucess}
                </h2>
                {/* Ícone animado */}
                <motion.div
                    className="text-green-600 dark:text-green-400 my-8"
                    initial={{ scale: 0, rotate: -290 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    <RxCheck size={50} />
                </motion.div>
                <p className="text-zinc-700 dark:text-zinc-300 mt-2 text-center">
                    {textSucess}
                </p>
            </motion.div>
        </motion.div>
    );
}
