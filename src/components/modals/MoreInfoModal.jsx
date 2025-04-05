import { useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

export default function MoreInfoModal({ title, items, imgUrl, trigger }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setIsOpen(true)}>
                {trigger}
            </span>

            {isOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                    <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
                        <button className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={() => setIsOpen(false)}>
                            <RxCross2 size={24} />
                        </button>

                        <h2 className="text-xl font-semibold text-center text-zinc-700 dark:text-zinc-300 mb-6">{title}</h2>

                        {imgUrl && <img src={imgUrl} alt="Imagem" className="w-full h-48 object-cover rounded-lg mb-4" />}

                        {items?.length > 0 ? (
                            <ul>
                                {items.map((item, index) => {
                                    return (
                                        <li key={index} className="border-b py-2">
                                            {/* Verifica se é um modelo */}
                                            {item.marca || item.ano ? (
                                                <>
                                                    <p><strong>Nome:</strong> {item.name || "(Sem nome)"}</p>
                                                    {item.marca && <p><strong>Marca:</strong> {item.marca}</p>}
                                                    {item.ano && <p><strong>Ano:</strong> {item.ano}</p>}
                                                </>
                                            ) : item.code ? (
                                                <>
                                                    <p><strong>Nome:</strong> {item.name || "(Sem nome)"}</p>
                                                    <p><strong>Código:</strong> {item.code}</p>
                                                </>
                                            ) : 
                                            {/* Caso genérico para outros tipos de itens */}
                                            (
                                                <>
                                                    {Object.entries(item).map(([key, value]) => (
                                                        <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || `(Sem ${key})`}</p>
                                                    ))}
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : imgUrl ? "" : <p>Nenhum dado disponível.</p>}
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}