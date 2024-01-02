import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const UserContext = createContext('');


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

    const [profile, setProfile] = useState(dataUser || null);

    const [getUserAll, setGetUserAll] = useState([]);

    // const [selectUser, setSelectUser] = useState(null);
    // const [isModalOpenDeleteUser, setIsModalOpenDeleteUser] = useState(false)

    // Função para lidar com o envio do formulário de login
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${PRD}login`, {
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


    // Efeito para obter o perfil do usuário
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await fetch(`${PRD}profile`, {
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
            navigate('/');
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

    const getUsers = async () => {
        try {
            const res = await fetch(`${PRD}all/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            const data = await res.json();
            setGetUserAll(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            setMessage(error);
        }
    };

    const fetchDataAndSetData = useCallback(async () => {
        try {
            const result = await getUsers();

            if (result) {
                localStorage.setItem('users', JSON.stringify(result));
            }

        } catch (error) {
            setMessage("Ocorreu um erro, tente novamente mais tarde");
        }
    }, []);


    useEffect(() => {
        // Check if cached data exists
        const cachedData = localStorage.getItem(('users'));
        if (cachedData) {
            setGetUserAll(JSON.parse(cachedData));
        }

        // Fetch new data
        fetchDataAndSetData();

        const refreshInterval = setInterval(fetchDataAndSetData, 1 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, [fetchDataAndSetData]);

    // const onClose = () => {
    //     setSelectUser(null);
    //     setIsModalOpenDeleteUser(false);
    // }

    const handleDeleteUser = async (id) => {
        try {
            const res = await fetch(`${PRD}/user/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const DataMSG = await res.json();

            if (res.ok) {
                fetchDataAndSetData();
                setMessage(DataMSG.msg);
                // onClose()
            } else {
                setMessage(`Erro ao excluir usuário: ${DataMSG.msg}`);
            }
        } catch (error) {
            console.error('Erro ao deletar usuário', error);
        }
    };

//delete 
    
    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                dataLogin,
                setDataLogin,
                handleSubmitLogin,
                tokenUser,
                exit,
                message,
                formatarData,
                profile,
                getUsers,
                getUserAll,
                handleDeleteUser,
                onClose,
                // setSelectUser,
                // selectUser,
                // isModalOpenDeleteUser,
                // setIsModalOpenDeleteUser,


            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { AuthContext, UserContext };
