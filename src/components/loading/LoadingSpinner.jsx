import { motion } from "framer-motion";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-40 z-50">
            <motion.div
                className="w-12 h-12 border-4 border-t-transparent border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    );
}
