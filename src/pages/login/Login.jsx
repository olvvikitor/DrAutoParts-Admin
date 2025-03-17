// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_URLS, BASE_URL } from "../../config/api";

export default function Login() {
    const { login, loading: authLoading } = useAuthContext(); // Adicione o estado loading
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para o carregamento do formulário

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Inicia o carregamento do formulário
        setError("");
        setSuccess(null);

        try {
            const response = await axios.post(
                `${BASE_URL}${API_URLS.AUTH.LOGIN}`,
                formData
            );

            console.log("response: ", response);

            const { token } = response.data;
            login(token);

            console.log("Adm logado:", response.data);
            setSuccess("Login realizado com sucesso!");
            setError(null);

            navigate("/home");
        } catch (err) {
            console.error("Erro ao fazer login:", err.response?.data || err);
            setError(err.response?.data?.message || "Erro ao realizar login");
            setSuccess(null);
        } finally {
            setIsSubmitting(false); // Finaliza o carregamento do formulário
        }
    };

    // Exibe o indicador de carregamento enquanto o useAuth está verificando a autenticação
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-white text-center">
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="w-full max-w-md p-6 border border-white rounded-md shadow-md">
                <h1 className="text-xl font-bold mb-4 text-center text-white">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        className="border border-white p-2 rounded-md text-white bg-transparent"
                        type="text"
                        name="login"
                        placeholder="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="border border-white p-2 rounded-md text-white bg-transparent"
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button
                        className="bg-amber-500 text-white p-2 rounded-md hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting} // Desabilita o botão durante o carregamento
                    >
                        {isSubmitting ? "Carregando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}