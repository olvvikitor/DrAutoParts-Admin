import React, { useState, useContext, useEffect } from "react";
import { RxArrowRight, RxArrowLeft, RxPencil2, RxTrash } from "react-icons/rx";
import { useNavigate } from "react-router";
import { ModelContext } from "../../contexts/ModelContext";
import { ProductContext } from "../../contexts/ProductContext";
import ConfirmModal from "../modals/ConfirmModal";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function TableModel({ data }) {

    console.log("vendo data no table:", data)

    const { getModels, fetchModels, deleteModel, loading, error, setError } = useContext(ModelContext);
    const { getProducts } = useContext(ProductContext);

    const [modelToDelete, setModelToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const tableData = Array.isArray(data) ? data : (data ? [data] : []);


    const navigate = useNavigate();

    // const filteredModel = getModels.filter((model) =>
    //     model.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    useEffect(() => {
        fetchModels(); // 🔄 Sempre busca os modelos ao montar
    }, []);

    const handleEdit = (model) => {
        navigate(`/model/edit/${model.id}`);
        setError(null);
    };

    const handleDeleteClick = (model) => {
        // Verifica se há produtos vinculados a este modelo
        const productsWithModel = getProducts.filter(product =>
            product.modelos && product.modelos.some(m => m.id === model.id)
        );
        console.log("productsWithModel.length ", productsWithModel.length)
        if (productsWithModel.length > 0) {
            setError("Não é possível deletar um modelo vinculado a produtos.");
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 2000);
            return;
        }

        setModelToDelete(model);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setModelToDelete(null);
    };

    const confirmDelete = async () => {
        if (!modelToDelete.id) {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 2000);
            closeDeleteModal();
            console.error("Erro: Nenhum modelo válido para deletar.");
            return;
        }

        try {

            const sucess = await deleteModel(modelToDelete.id);

            if (sucess) {

                setShowSuccessModal(true);

                setTimeout(() => {
                    setShowSuccessModal(false);
                }, 2000);
            }

        } catch (error) {

            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 2000);
            closeDeleteModal();
            console.error("Erro ao deletar o modelo:", error);

        } finally {
            closeDeleteModal();

        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número de linhas vazias necessárias
    const emptyRows = itemsPerPage - currentItems.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(tableData.length / itemsPerPage);
        const buttons = [];

        if (totalPages <= 1) return null;

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

        if (currentPage > 2) {
            buttons.push(
                <li key="start-ellipsis" className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                    ...
                </li>
            );
        }

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

        if (currentPage < totalPages - 1) {
            buttons.push(
                <li key="end-ellipsis" className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                    ...
                </li>
            );
        }

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
        <div className="flex flex-col overflow-x-auto min-w-[250px] rounded-lg dark:bg-gray-700 dark:text-gray-400 ">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Nome</th>
                            <th scope="col" className="px-4 py-3">Marca</th>
                            <th scope="col" className="px-4 py-3">Ano</th>
                            <th scope="col" className="px-4 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </td>
                                <td className="px-4 py-3">{item.marca}</td>
                                <td className="px-4 py-3">{item.ano}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                    >
                                        <RxPencil2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                                    >
                                        <RxTrash size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Renderizar linhas vazias */}
                        {Array.from({ length: emptyRows }).map((_, index) => (
                            <tr key={`empty-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    &nbsp;
                                </th>
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    &nbsp;
                                </th>
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3 flex gap-2">
                                    &nbsp;
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <nav className="flex justify-end items-center py-4 bg-gray-200 dark:bg-gray-600 px-6" aria-label="Table navigation">
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
                            disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)}
                            className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === Math.ceil(tableData.length / itemsPerPage)
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600 dark:text-gray-500"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            <RxArrowRight size={17} />
                        </button>
                    </li>
                </ul>
            </nav>
            {/* Modais */}
            {isDeleteModalOpen && (
                <ConfirmModal
                    titleConfirm="Deletar Modelo"
                    textConfirm={
                        <>
                            Tem certeza que deseja deletar
                            <span className="text-xl font-bold"> {modelToDelete.name} </span>
                            Esta ação não pode ser desfeita.
                        </>
                    }
                    onClose={closeDeleteModal}
                    onConfirm={confirmDelete}
                    titleButton={"Deletar"}
                />
            )}

            {showSuccessModal && <SucessModal titleSucess="Modelo Deletado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao deletar modelo!" textError={error} />}
            {loading && <LoadingSpinner />}

        </div>
    );
}