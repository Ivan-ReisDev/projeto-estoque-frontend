import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';
import { UserContext } from './UserContext';


// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextCategory = createContext('');

const CategoryContext = ({ children }) => {
    const { profile, tokenUser } = useContext(UserContext);
    const [allCategory, setAllCategory] = useState([])
    const [message, setMessage] = useState('')

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false)
    const [isModalOpenCategoryDelete, setIsModalOpenCategoryDelete] = useState(false)

    const getCategory = async () => {
        try {
            const res = await fetch(`${PRD}get/category`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });

            const data = await res.json();
            setAllCategory(data);
            return data;

        } catch (error) {
            setMessage(error);
        }

    }
    
    //Função cria categoria 
    const handleSubmitCategory = async (data) => {
        try {

            const res = await fetch(`${PRD}create/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formdata: data,
                })
            });
            console.log(res)

            if(profile.userType === "Administrador") {
                const DataMSG = await res.json();
                 console.log(DataMSG);

                 if (res.ok) {
                    setMessage(DataMSG.msg);
                    getCategory();
                } else {
                    setMessage(`Erro ao cadastrar categoria: ${DataMSG.msg}`);
                }
            }


        } catch (error) {
            console.error('Erro ao criar produto', error);
        }

    };
    // /delete/category/

    const handleDeleteCategory = async (id) => {
        try {
            const res = await fetch(`${PRD}delete/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const DataMSG = await res.json();

            if (res.ok) {
                setMessage(DataMSG.msg);
                getCategory();
                onClose();
            } else {
                setMessage(`Erro ao excluir categoria: ${DataMSG.msg}`);
            }
        } catch (error) {
            console.error('Erro ao deletar categora', error);
        }
    };




    const onClose = () => {
        setSelectedCategory(null);

        useEffect(() => {
            // Definir um temporizador para mudar a mensagem após 3 segundos
            const time = setTimeout(() => {
                setMessage('');
            }, 5000);
            // Limpando o temporizador ao desmontar o componente (componentWillUnmount)
            return () => clearTimeout(time);
        }, [message]);
        // setIsModalOpen(false);
    }


    useEffect(() => {
        getCategory();
    }, []);

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextCategory.Provider
            value={{
                getCategory,
                allCategory,
                message,
                setMessage,
                selectedCategory,
                setSelectedCategory,
                isModalOpenCategory,
                setIsModalOpenCategory,
                handleSubmitCategory,
                isModalOpenCategoryDelete,
                setIsModalOpenCategoryDelete,
                handleDeleteCategory
            }}
        >
            {children}
        </ContextCategory.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
CategoryContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { CategoryContext, ContextCategory };
