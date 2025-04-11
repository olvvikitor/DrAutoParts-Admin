import React, { useState, useContext, useEffect } from "react";
import { RxArrowRight, RxArrowLeft, RxPencil2, RxTrash } from "react-icons/rx";
import { SupplierContext } from "../../contexts/SupplierContext";
import { ProductContext } from "../../contexts/ProductContext";
import { useNavigate } from "react-router";
import ConfirmModal from "../modals/ConfirmModal";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function TableSupplier({ searchTerm }) {
    const {
        getSuppliers,
        deleteSupplier,
        error,
        setError,
        fetchSuppliers,
        loading
    } = useContext(SupplierContext);

    const { getProducts } = useContext(ProductContext);

    const [supplierToDelete, setSupplierToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const navigate = useNavigate();

    const filteredSuppliers = getSuppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.code.toLowerCase().includes(searchTerm.toLowerCase())

    );

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleEdit = (supplier) => {
        navigate(`/supplier/edit/${supplier.id}`);
    };

    const handleDeleteClick = (supplier) => {
        // Verifica se há produtos vinculados a este fornecedor
        const productsWithSupplier = getProducts.filter(product =>
            product.fornecedores && product.fornecedores.some(f => f.id === supplier.id)
        );

        if (productsWithSupplier.length > 0) {
            setError("Não é possível deletar um fornecedor vinculado a produtos.");
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 2000);
            return;
        }

        setSupplierToDelete(supplier);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSupplierToDelete(null);
    };

    const confirmDelete = async () => {  // ⬅️ Tornar a função assíncrona
        if (!supplierToDelete.id) {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 2000);
            closeDeleteModal();
            console.error("Erro: Nenhum fornecedor válido para deletar.");
            return;
        }

        try {
            const sucess = await deleteSupplier(supplierToDelete.id);  // ⬅️ Aguarda a execução antes de continuar

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
            console.error("Erro ao deletar o fornecedor:", error);
        } finally {
            closeDeleteModal();  // ⬅️ Fecha o modal após tudo
        }
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número de linhas vazias necessárias
    const emptyRows = itemsPerPage - currentItems.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(getSuppliers.length / itemsPerPage);
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
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400 rounded-2xl">
                        <tr>
                            <th scope="col" className="px-4 py-3">Nome</th>
                            <th scope="col" className="px-4 py-3">Código</th>
                            <th scope="col" className="px-4 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </td>
                                <td className="px-4 py-3">{item.code}</td>
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
                            disabled={currentPage === Math.ceil(getSuppliers.length / itemsPerPage)}
                            className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === Math.ceil(getSuppliers.length / itemsPerPage)
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
                    titleConfirm="Deletar Fornecedor"
                    textConfirm={
                        <>
                            Tem certeza que deseja deletar
                            <span className="text-xl font-bold"> {supplierToDelete.name} </span>
                            <span className="text-xl font-bold"> {supplierToDelete.code} </span>? <br />
                            Esta ação não pode ser desfeita.
                        </>
                    }
                    onClose={closeDeleteModal}
                    onConfirm={confirmDelete}
                    titleButton={"Deletar"}
                />
            )}

            {showSuccessModal && <SucessModal titleSucess="Fornecedor Deletado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao deletar fornecedor!" textError={error} />}
            {loading && <LoadingSpinner />}

        </div>
    );
}