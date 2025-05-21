import { useState, useEffect, useContext, createContext, useCallback } from "react";
import axios from "axios";
import { BASE_URL, API_URLS } from "../config/api";
import { AuthContext } from "../contexts/AuthContext";

export const CustomerContext = createContext();

export function CustomerProvider({ children }) {

    const [loading, setLoading] = useState(false)

    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [getCarousel, setGetCarousel] = useState([]);

    useEffect(() => {
        fetchCarousels();
    }, [])

    // ✅ GET Modelos com Token
    const fetchCarousels = useCallback(async () => {

        setLoading(false)

        try {
            const respose = await axios.get(`${BASE_URL}${API_URLS.CUSTOMER.GET_CAROUSEL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetCarousel(respose.data);
            console.log("Carrossel carregados com sucesso context!");

        } catch (error) {
            console.error("Erro ao buscar carrossel:", error);
            setError(errorMessage);

        }
    }, [token]);

    // ✅ POST carrossel (upload de até 4 imagens PNG)
    const addCarousel = useCallback(async (images) => {
        setLoading(true);
        setError(null);

        if (!images || images.length === 0) {
            setError("Selecione pelo menos uma imagem.");
            setLoading(false);
            return;
        }

        if (images.length > 4) {
            setError("Você só pode enviar no máximo 4 imagens.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        images.forEach((image) => {
            if (image.type !== "image/png") {
                setError("Apenas arquivos PNG são permitidos.");
                setLoading(false);
                return;
            }
            formData.append("images", image);
        });

        try {
            const response = await axios.post(`${BASE_URL}${API_URLS.CUSTOMER.CREATE_CAROUSEL}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                console.log("Carrossel criado com sucesso context:", response.data);
            await fetchCarousels(); // Atualiza lista após criação
                return true;
            } else {
                throw new Error('Falha ao criar carrosel context');
            }

        } catch (error) {
            console.error("Erro ao criar carrossel:", error);
            setError("Erro ao criar carrossel");
        } finally {
            setLoading(false);
        }
    }, [token, fetchCarousels]);

    return (
        <CustomerContext.Provider value={
            {
                getCarousel,
                fetchCarousels,
                addCarousel,
                loading,
                error,
                setError
            }}>
            {children}
        </CustomerContext.Provider>
    )
}