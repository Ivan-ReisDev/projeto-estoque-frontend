import { createContext, useState } from 'react';
import PropTypes from 'prop-types';


const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextProducts = createContext('');

const ProductsContext = ({ children }) => {

    // Obtém dados do usuário do armazenamento local
    const dataUser = localStorage.getItem('dataUser');

    // Estado para dados do formulário de produtos
    const [formData, setFormData] = useState({
        nameProducts: '',
        description: '',
        category: '',
        link: '',
        codeSKU: '',
        mark: '',
        stock: 0,
        price: 0.00,
        localization: '',
    });

    // Função para lidar com o envio do formulário de produtos
    const handleSubmitProducts = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${PRD}create/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: formData,
                    idUser: dataUser._id,
                    nameUser: dataUser.user,
                }),
            });

            const DataMSG = await res.json();
            console.log(DataMSG);
        } catch (error) {
            console.error('Erro ao criar produto', error);
        }

        // Limpar o formulário
        setFormData({
            nameProducts: '',
            description: '',
            category: '',
            link: '',
            codeSKU: '',
            mark: '',
            stock: 0,
            price: 0.00,
            localization: '',
        });
    };

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextProducts.Provider
            value={{
                setFormData,
                formData,
                handleSubmitProducts,
            }}
        >
            {children}
        </ContextProducts.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
ProductsContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { ProductsContext, ContextProducts };
