import React, { useState, useContext, useEffect } from "react";
import { RxArrowRight, RxArrowLeft, RxPencil2, RxTrash } from "react-icons/rx";
import { useNavigate } from "react-router";
import { ProductContext } from "../../contexts/ProductContext";
import ConfirmModal from "../modals/ConfirmModal";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import MoreInfoModal from "../modals/MoreInfoModal";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function TableProduct({ searchTerm }) {

    const { getProducts, fetchProducts, deleteProduct, loading } = useContext(ProductContext);

    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const navigate = useNavigate();

    console.log("retorno de productos: ", getProducts);


    // const filteredProduct = getProducts.filter((product) =>
    //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     product.code.toLowerCase().includes(searchTerm.toLowerCase())

    // );
    
    const filteredProduct = getProducts.filter((product) => {
        // Verifica se há correspondência no nome ou código do produto
        const matchesProduct = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.code.toLowerCase().includes(searchTerm.toLowerCase());

        // Verifica se há correspondência nos códigos dos fornecedores
        const matchesSupplierCode = product.fornecedores.some(supplier =>
            supplier.code.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesProduct || matchesSupplierCode;
    });

    useEffect(() => {
        fetchProducts(); // 🔄 Sempre busca os fornecedores ao montar
    }, []);

    const handleEdit = (product) => {
        navigate(`/product/edit/${product.id}`);
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const confirmDelete = async () => {
        if (!productToDelete.id) {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 2000);
            closeDeleteModal();
            console.error("Erro: Nenhum produto válido para deletar.");
            return;
        }

        try {

            const sucess = await deleteProduct(productToDelete.id);

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
            console.error("Erro ao deletar o produto:", error);

        } finally {
            closeDeleteModal();

        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular o número de linhas vazias necessárias
    const emptyRows = itemsPerPage - currentItems.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(getProducts.length / itemsPerPage);
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
                <table className="w-full text-sm text-start rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Nome</th>
                            <th scope="col" className="px-4 py-3">Código</th>
                            <th scope="col" className="px-4 py-3">Descrição</th>
                            <th scope="col" className="px-4 py-3">Tipo</th>
                            <th scope="col" className="px-4 py-3">Preço</th>
                            <th scope="col" className="px-4 py-3">Preço de custo</th>
                            <th scope="col" className="px-4 py-3">Categoria</th>
                            <th scope="col" className="px-4 py-3">Modelos</th>
                            <th scope="col" className="px-4 py-3">Fornecedores</th>
                            <th scope="col" className="px-4 py-3">Imagem</th>
                            <th scope="col" className="px-4 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </td>
                                <td className="px-4 py-3">{item.code}</td>
                                <td className="px-4 py-3">{item.descricao}</td>
                                <td className="px-4 py-3">{item.tipo}</td>
                                <td className="px-4 py-3">{item.price}</td>
                                <td className="px-4 py-3">{item.pricecoast}</td>
                                <td className="px-4 py-3">{item.categoria.name}</td>
                                <td className="px-4 py-3">
                                    {item.modelos.length > 0 && (
                                        <MoreInfoModal title="Modelos" items={item.modelos} trigger="Visualizar" />
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    {item.fornecedores.length > 0 && (
                                        <MoreInfoModal title="Fornecedores" items={item.fornecedores} trigger="Visualizar" />
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <MoreInfoModal
                                        title="Imagem"
                                        imgUrl={item.imgUrl}
                                        trigger="Visualizar"
                                    />
                                </td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                        title="Editar"

                                    >
                                        <RxPencil2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                                        title="Remover"

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
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3">&nbsp;</td>
                                <td className="px-4 py-3">&nbsp;</td>
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
                            disabled={currentPage === Math.ceil(getProducts.length / itemsPerPage)}
                            className={`px-3 h-8 flex items-center justify-center border rounded-lg transition-colors ${currentPage === Math.ceil(getProducts.length / itemsPerPage)
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
                    titleConfirm="Deletar Produto"
                    textConfirm={
                        <>
                            Tem certeza que deseja deletar
                            <span className="text-xl font-bold"> {productToDelete.name} </span>
                            Esta ação não pode ser desfeita.
                        </>
                    }
                    onClose={closeDeleteModal}
                    onConfirm={confirmDelete}
                    titleButton={"Deletar"}
                />
            )}

            {showSuccessModal && <SucessModal titleSucess="Produto Deletado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao deletar produto!" />}
            {loading && <LoadingSpinner />}

        </div>
    );
}