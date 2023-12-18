import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';
import { UserContext } from './UserContext';


const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextProducts = createContext('');

const ProductsContext = ({ children }) => {

    const { profile, tokenUser } = useContext(UserContext);

    // Reservar os produtos
    const [allProduct, setAllProduct] = useState([]);
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
                    idUser: profile._id,
                    nameUser: profile.user,
                }),
            });

            const DataMSG = await res.json();
            console.log('teste', DataMSG);
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
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            const data = await res.json();
            return data
        } catch (error) {
            setMessage(error);
        }
    };


    const fetchDataAndSetData = useCallback(async () => {
        try {
            const result = await getProductsAll();

            if (result) {
                localStorage.setItem('produtos', JSON.stringify(result));
            }

        } catch (error) {
            console.log("Ocorreu um erro, tente novamente mais tarde");
        }
    }, []);


    useEffect(() => {
        // Check if cached data exists
        const cachedData = localStorage.getItem(('produtos'));
        if (cachedData) {
            setAllProduct(JSON.parse(cachedData));            
        }

        // Fetch new data
        fetchDataAndSetData();

        const refreshInterval = setInterval(fetchDataAndSetData, 1 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, [fetchDataAndSetData]);

    // Função para barra de pesquisa dos produtos
    function searchAllProducts(e) {
        const value = e.target.value.trim().toLowerCase();

        if (value === '') {
            // Se a string de pesquisa estiver vazia, recarregue todos os produtos da API
            getProductsAll();
        } else {
            const resultProduct = allProduct.filter((filme) => {
                const termSearch = removeAccents(value.replace(/\s+/g, '.*\\b'));
                const nameProductRemoveACcent = removeAccents(
                    filme.nameProducts.toLowerCase()
                );
                const regex = new RegExp(`\\b${termSearch}.*`, 'i');
                return regex.test(nameProductRemoveACcent);
            });

            setAllProduct(resultProduct);
        }
    }

    // Efeito para obter todos os produtos ao carregar a página
    useEffect(() => {
        getProductsAll();
    }, [tokenUser]);

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextProducts.Provider
            value={{
                setFormData,
                formData,
                handleSubmitProducts,
                message,
                searchAllProducts,
                allProduct
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
