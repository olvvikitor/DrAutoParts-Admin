import { RxPlus } from "react-icons/rx";
import TableProduct from "../../components/table/TableProduct";

export default function Product() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Produtos</h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <div className="flex items-center gap-3 my-5 curso-pointer">
                    <button className="text-zinc-700 dark:text-zinc-300 bg-zinc-200/40 dark:bg-zinc-500/50 border-1 border-zinc-400 rounded-md p-2 cursor-pointer">
                        <RxPlus size={20} />
                    </button>
                    <h3>Adicionar novo produto</h3>
                </div>
                <TableProduct/>
            </div>
        </div>
    )
}