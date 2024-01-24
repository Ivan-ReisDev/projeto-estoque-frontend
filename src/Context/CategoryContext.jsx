import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';
import { UserContext } from './UserContext';


// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextCategory = createContext('');

const CategoryContext = ({ children }) => {
    const { profile, tokenUser } = useContext(UserContext);
    const [ allCategory, setAllCategory] = useState([])
    const [ message, setMessage] = useState('')


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

    useEffect(() => {
        getCategory();
    }, [setAllCategory, tokenUser]);
    
    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextCategory.Provider
            value={{
                getCategory,
                allCategory,
                message,
                setMessage
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
