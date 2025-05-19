import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { RxPlus, RxMagnifyingGlass } from "react-icons/rx";
import { Link } from "react-router";
import { CustomerContext } from "../../contexts/CustomerContext";
import ImageGallery from "../../components/customer/ImageGallery";

export default function Carousel() {

    const { getCarousel, fetchCarousel } = useContext(CustomerContext);

    const images = getCarousel?.imgUrl || [];

    console.log("vendo Carrossel: ", images);

    return (
        <div className="p-2">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Carrossel
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/carousel/create" onClick={() => { setError(null) }} className="flex items-center gap-3 my-5 curso-pointer"
                    >
                        <button
                            className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer"
                        >
                            <RxPlus size={20} />
                        </button>
                        <h3>Adicionar novo carrossel</h3>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ImageGallery images={images} />

                </motion.div>
            </div>
        </div>
    );
}