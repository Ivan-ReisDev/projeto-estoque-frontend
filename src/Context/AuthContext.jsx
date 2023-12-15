import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
    const [allProducts, setAllProducts] = useState();
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

            if (resJSON.token) {
                localStorage.setItem('token', resJSON.token);
                navigate('/home');
            } else {
                localStorage.removeItem('token');
                navigate('/');
            }
        } catch (error) {
            console.error('Erro no login', error);
        }
    };

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

                const data = await res.json();
                localStorage.setItem('dataUser', JSON.stringify(data));
                setProfile(data);
            } catch (error) {
                setMessage(error);
            }
        };
        getProfile();
    }, [tokenUser]);

    // Efeito para verificar se há um token de autenticação no armazenamento local
    useEffect(() => {
        const tokenAuth = localStorage.getItem('token');
        if (tokenAuth) {
            setTokenUser(tokenAuth);
        }
    }, [setTokenUser, navigate]);

    // Efeito para obter todos os produtos
    useEffect(() => {
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
        getProductsAll();
    }, [tokenUser]);

    // Função para realizar logout
    const exit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('dataUser');
        navigate('/');
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
                tokenUser,
                exit,
                message,
                allProducts,
                formatarData,
                profile,
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
