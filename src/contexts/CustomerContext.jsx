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
        
        setLoading(true)

        try {
            const respose = await axios.get(`${BASE_URL}${API_URLS.CUSTOMER.CAROUSEL}`, {
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

    return (
        <CustomerContext.Provider value={
            {
                getCarousel,
                fetchCarousels,
                loading,
                error,
                setError
            }}>
            {children}
        </CustomerContext.Provider>
    )
}