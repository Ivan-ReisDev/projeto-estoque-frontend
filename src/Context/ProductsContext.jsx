import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';


// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextProducts = createContext('');

const ProductsContext = ({ children }) => {

    // Obtém dados do usuário do armazenamento local
    const dataUser = localStorage.getItem('dataUser');
    const tokenAuth = localStorage.getItem('token');
    // Reservar os produtos
    const [allProducts, setAllProducts] = useState([]);
    const [message, setMessage] = useState('');
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


    // Função para obter todos os produtos
    const getProductsAll = async () => {
        try {
            const res = await fetch(`${PRD}get/products`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });

            const data = await res.json();
            setAllProducts(data);
        } catch (error) {
            setMessage(error);
        }
    };

    // Função para barra de pesquisa dos produtos
    function searchAllProducts(e) {
        const value = e.target.value.trim().toLowerCase();

        if (value === '') {
            // Se a string de pesquisa estiver vazia, recarregue todos os produtos da API
            getProductsAll();
        } else {
            const resultProduct = allProducts.filter((filme) => {
                const termSearch = removeAccents(value.replace(/\s+/g, '.*\\b'));
                const nameProductRemoveACcent = removeAccents(
                    filme.nameProducts.toLowerCase()
                );
                const regex = new RegExp(`\\b${termSearch}.*`, 'i');
                return regex.test(nameProductRemoveACcent);
            });

            setAllProducts(resultProduct);
        }
    }

    // Efeito para obter todos os produtos ao carregar a página
    useEffect(() => {
        getProductsAll();
    }, [tokenAuth]);

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextProducts.Provider
            value={{
                setFormData,
                formData,
                handleSubmitProducts,
                message,
                searchAllProducts,
                allProducts
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
