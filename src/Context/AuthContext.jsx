import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import removeAccents from 'remove-accents';


const API = 'http://localhost:3000/api/';


const Context = createContext('');


const AuthContext = ({ children }) => {


    const navigate = useNavigate();

    // Obtém dados do usuário do armazenamento local
    const dataUser = localStorage.getItem('dataUser');

    // Estado para dados de login
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    });

    // Estado para mensagens de resposta
    const [message, setMessage] = useState('');
    const [tokenUser, setTokenUser] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [profile, setProfile] = useState(dataUser || null);

    // Função para lidar com o envio do formulário de login
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataLogin),
            });

            const resJSON = await res.json();
            setMessage(resJSON);

            if (res.ok) {
                localStorage.setItem('token', resJSON.token);
                navigate('/home');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('dataUser');
                navigate('/');
            }
        } catch (error) {
            console.error('Erro no login', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}remove/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const DataMSG = await res.json();

            if (res.ok) {
                window.location.reload();
                setMessage(DataMSG.msg);
            } else {
                setMessage(`Erro ao excluir produto: ${DataMSG.msg}`);
            }
        } catch (error) {
            console.error('Erro ao deletar produto', error);
        }
    };


    // Função para obter todos os produtos
    const getProductsAll = async () => {
        try {
            const res = await fetch(`${API}get/products`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });

            const data = await res.json();
            setAllProducts(data);
        } catch (error) {
            setMessage(error);
        }
    };

    function searchAllProducts(e) {
        const value = e.target.value.trim().toLowerCase();

        if (value === '') {
            // Se a string de pesquisa estiver vazia, recarregue todos os produtos da API
            getProductsAll();
        } else {
            const resultProduct = allProducts.filter(filme => {
                const termSearch = removeAccents(value.replace(/\s+/g, '.*\\b'));
                const nameProductRemoveACcent = removeAccents(filme.nameProducts.toLowerCase());
                const regex = new RegExp(`\\b${termSearch}.*`, 'i');
                return regex.test(nameProductRemoveACcent);
            });

            setAllProducts(resultProduct);
        }
    }
    
    useEffect(() => {
        getProductsAll();
    }, [tokenUser]);

    // Efeito para obter o perfil do usuário
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await fetch(`${API}profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await res.json();
                localStorage.setItem('dataUser', JSON.stringify(data));
                setProfile(data);
            } catch (error) {
                setMessage(error.message || 'Erro desconhecido');
            }
        };

        if (tokenUser) {
            getProfile();
        }
    }, [tokenUser, setProfile, setMessage]);


    // Efeito para verificar se há um token de autenticação no armazenamento local
    useEffect(() => {
        const tokenAuth = localStorage.getItem('token');
        if (tokenAuth) {
            setTokenUser(tokenAuth);
        } else {
            navigate('/')
        }
    }, [setTokenUser, navigate]);


    // Função para realizar logout
    const exit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('dataUser');
        navigate('/');
        window.location.reload();

    };


    // Função para formatar data do MongoDB
    function formatarData(dataDoMongoDB) {
        const dataObjeto = new Date(dataDoMongoDB);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Fornecimento do contexto para os componentes filhos
    return (
        <Context.Provider
            value={{
                dataLogin,
                setDataLogin,
                handleSubmitLogin,
                handleDelete,
                tokenUser,
                exit,
                message,
                allProducts,
                formatarData,
                profile,
                searchAllProducts

            }}
        >
            {children}
        </Context.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { AuthContext, Context };
