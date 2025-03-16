import React, { useState } from "react";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";

export default function TableProduct() {
    // Dados da tabela
    const data = [
        { id: 1, name: "1", color: "Silver", category: "Laptop", price: "$2999" },
        { id: 2, name: "2", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 3, name: "3", color: "Black", category: "Accessories", price: "$99" },
        { id: 4, name: "4", color: "Silver", category: "Laptop", price: "$2999" },
        { id: 5, name: "5", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 6, name: "6", color: "Black", category: "Accessories", price: "$99" },
        { id: 7, name: "7", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 8, name: "8", color: "Black", category: "Accessories", price: "$99" },
        { id: 9, name: "9", color: "Black", category: "Accessories", price: "$99" },
        { id: 10, name: "10", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 11, name: "11", color: "Black", category: "Accessories", price: "$99" },
        { id: 12, name: "12", color: "Black", category: "Accessories", price: "$99" },
        { id: 13, name: "13", color: "Black", category: "Accessories", price: "$99" },
        { id: 14, name: "14", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 15, name: "15", color: "Black", category: "Accessories", price: "$99" },
        { id: 16, name: "16", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 17, name: "17", color: "Black", category: "Accessories", price: "$99" },
        { id: 18, name: "18", color: "Black", category: "Accessories", price: "$99" },
        { id: 19, name: "19", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 20, name: "20", color: "Black", category: "Accessories", price: "$99" },
        { id: 21, name: "21", color: "Black", category: "Accessories", price: "$99" },
        { id: 22, name: "22", color: "Black", category: "Accessories", price: "$99" },
        { id: 23, name: "23", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 24, name: "24", color: "Black", category: "Accessories", price: "$99" },
        { id: 25, name: "25", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 26, name: "26", color: "Black", category: "Accessories", price: "$99" },
        { id: 27, name: "27", color: "Black", category: "Accessories", price: "$99" },
        { id: 28, name: "28", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 29, name: "29", color: "Black", category: "Accessories", price: "$99" },
        { id: 30, name: "30", color: "Black", category: "Accessories", price: "$99" },
        { id: 31, name: "31", color: "Black", category: "Accessories", price: "$99" },
        { id: 32, name: "32", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 33, name: "33", color: "Black", category: "Accessories", price: "$99" },
        { id: 34, name: "34", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 35, name: "35", color: "Black", category: "Accessories", price: "$99" },
        { id: 36, name: "36", color: "Black", category: "Accessories", price: "$99" },
        { id: 37, name: "37", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 38, name: "38", color: "Black", category: "Accessories", price: "$99" },
        { id: 39, name: "39", color: "Black", category: "Accessories", price: "$99" },
        { id: 40, name: "40", color: "Black", category: "Accessories", price: "$99" },
        { id: 41, name: "41", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 42, name: "42", color: "Black", category: "Accessories", price: "$99" },
        { id: 43, name: "43", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 44, name: "44", color: "Black", category: "Accessories", price: "$99" },
        { id: 45, name: "45", color: "Black", category: "Accessories", price: "$99" },
        { id: 46, name: "46", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 47, name: "47", color: "Black", category: "Accessories", price: "$99" },
        { id: 48, name: "48", color: "Black", category: "Accessories", price: "$99" },
        { id: 49, name: "49", color: "Black", category: "Accessories", price: "$99" },
        { id: 50, name: "50", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 51, name: "51", color: "Black", category: "Accessories", price: "$99" },
        { id: 52, name: "52", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 53, name: "53", color: "Black", category: "Accessories", price: "$99" },
        { id: 54, name: "54", color: "Black", category: "Accessories", price: "$99" },
        { id: 55, name: "55", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 56, name: "56", color: "Black", category: "Accessories", price: "$99" },
        { id: 57, name: "57", color: "Black", category: "Accessories", price: "$99" },
        { id: 58, name: "58", color: "Black", category: "Accessories", price: "$99" },
        { id: 59, name: "59", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 60, name: "60", color: "Black", category: "Accessories", price: "$99" },
        { id: 61, name: "61", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 62, name: "62", color: "Black", category: "Accessories", price: "$99" },
        { id: 63, name: "63", color: "Black", category: "Accessories", price: "$99" },
        { id: 64, name: "64", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 65, name: "65", color: "Black", category: "Accessories", price: "$99" },
        { id: 66, name: "66", color: "Black", category: "Accessories", price: "$99" },
        { id: 67, name: "67", color: "Black", category: "Accessories", price: "$99" },
        { id: 68, name: "68", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 69, name: "69", color: "Black", category: "Accessories", price: "$99" },
        { id: 70, name: "70", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 71, name: "71", color: "Black", category: "Accessories", price: "$99" },
        { id: 72, name: "72", color: "Black", category: "Accessories", price: "$99" },
        { id: 73, name: "73", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 74, name: "74", color: "Black", category: "Accessories", price: "$99" },
        { id: 75, name: "75", color: "Black", category: "Accessories", price: "$99" },
        { id: 76, name: "76", color: "Black", category: "Accessories", price: "$99" },
        { id: 77, name: "77", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 78, name: "78", color: "Black", category: "Accessories", price: "$99" },
        { id: 79, name: "79", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 80, name: "80", color: "Black", category: "Accessories", price: "$99" },
        { id: 81, name: "81", color: "Black", category: "Accessories", price: "$99" },
        { id: 82, name: "82", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 83, name: "83", color: "Black", category: "Accessories", price: "$99" },
        { id: 84, name: "84", color: "Black", category: "Accessories", price: "$99" },
        { id: 85, name: "85", color: "Black", category: "Accessories", price: "$99" },
        { id: 86, name: "86", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 87, name: "87", color: "Black", category: "Accessories", price: "$99" },
        { id: 88, name: "88", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 89, name: "89", color: "Black", category: "Accessories", price: "$99" },
        { id: 90, name: "90", color: "Black", category: "Accessories", price: "$99" },
        { id: 91, name: "91", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 92, name: "92", color: "Black", category: "Accessories", price: "$99" },
        { id: 93, name: "93", color: "Black", category: "Accessories", price: "$99" },
        { id: 94, name: "94", color: "Black", category: "Accessories", price: "$99" },
        { id: 95, name: "95", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 96, name: "96", color: "Black", category: "Accessories", price: "$99" },
        { id: 97, name: "97", color: "White", category: "Laptop PC", price: "$1999" },
        { id: 98, name: "98", color: "Black", category: "Accessories", price: "$99" },
        { id: 99, name: "99", color: "Black", category: "Accessories", price: "$99" },
        { id: 100, name: "100", color: "White", category: "Laptop PC", price: "$1999" },
    ];

    // Estado para controlar a página atual
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Limite de linhas por página

    // Calcular os itens da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Função para gerar os botões de paginação com reticências
    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const buttons = [];

        if (totalPages <= 1) return null; // Se houver apenas uma página, não mostra paginação

        // Botão para a primeira página
        buttons.push(
            <li key={1}>
                <button
                    onClick={() => paginate(1)}
                    className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === 1
                            ? "text-blue-600 bg-blue-50 dark:bg-blue-600 dark:text-white"
                            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                >
                    1
                </button>
            </li>
        );

        // Reticências antes da página atual se necessário
        if (currentPage > 2) {
            buttons.push(
                <li key="start-ellipsis" className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                    ...
                </li>
            );
        }

        // Botão para a página atual
        if (currentPage !== 1 && currentPage !== totalPages) {
            buttons.push(
                <li key={currentPage}>
                    <button
                        onClick={() => paginate(currentPage)}
                        className={`px-3 h-8 flex items-center justify-center border rounded-lg text-blue-600 bg-blue-50 dark:bg-blue-600 dark:text-white`}
                    >
                        {currentPage}
                    </button>
                </li>
            );
        }

        // Reticências após a página atual se necessário
        if (currentPage < totalPages - 1) {
            buttons.push(
                <li key="end-ellipsis" className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                    ...
                </li>
            );
        }

        // Botão para a última página
        if (totalPages > 1) {
            buttons.push(
                <li key={totalPages}>
                    <button
                        onClick={() => paginate(totalPages)}
                        className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === totalPages
                                ? "text-blue-600 bg-blue-50 dark:bg-blue-600 dark:text-white"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                    >
                        {totalPages}
                    </button>
                </li>
            );
        }

        return buttons;
    };

    return (
        <div className="flex flex-col overflow-x-auto min-w-[250px] rounded-lg dark:bg-gray-700 dark:text-gray-400 p-2">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Product name</th>
                            <th scope="col" className="px-4 py-3">Color</th>
                            <th scope="col" className="px-4 py-3">Category</th>
                            <th scope="col" className="px-4 py-3">Price</th>
                            <th scope="col" className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="px-4 py-3">{item.color}</td>
                                <td className="px-4 py-3">{item.category}</td>
                                <td className="px-4 py-3">{item.price}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Deletar</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav className="flex justify-end items-center py-4 bg-gray-50 dark:bg-gray-700" aria-label="Table navigation">
                <ul className="inline-flex gap-0.5 text-sm h-8">
                    <li>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === 1
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600 dark:text-gray-500"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            <RxArrowLeft size={17} />
                        </button>
                    </li>

                    {renderPaginationButtons()}

                    <li>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                            className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === Math.ceil(data.length / itemsPerPage)
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600 dark:text-gray-500"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            <RxArrowRight size={17} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}