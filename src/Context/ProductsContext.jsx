import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'remove-accents';
import { UserContext } from './UserContext';


// const API = 'http://localhost:3000/api/';
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


    const [formUpdate, setFormUpdate] = useState({
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


    const [selectedProducts, setSelectedProducts] = useState(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)


    // Função para lidar com o envio do formulário de produtos
    const handleSubmitProducts = async (e) => {

        try {

            const res = await fetch(`${PRD}create/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: e,
                    idUser: profile._id,
                    nameUser: profile.user,
                }),
            });

            console.log(res)

            const DataMSG = await res.json();
            console.log(DataMSG);
            if (res.ok) {
                searchAllProducts()
                setMessage(DataMSG.msg);
            } else {
                setMessage(DataMSG.msg);
            }
        } catch (error) {
            console.error('Erro ao criar produto', error);
        }

    };


    const handleUpdateProducts = async (id) => {

        try {

            const updateData = {
                nameProducts: formUpdate.nameProducts,
                description: formUpdate.description,
                category: formUpdate.category,
                link: formUpdate.link,
                codeSKU: formUpdate.codeSKU,
                mark: formUpdate.mark,
                stock: formUpdate.stock,
                price: formUpdate.price,
                localization: formUpdate.localization
            };

            const res = await fetch(`${PRD}update/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                searchAllProducts()
                setMessage(DataMSG.msg);
            } else {
                setMessage(`Erro ao atualizar produto: ${DataMSG.msg}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
        };
    };

    const onClose = () => {
        setSelectedProducts(null);
        // setIsModalOpen(false);
    }
    // Função para excluir um produto
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${PRD}remove/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const DataMSG = await res.json();

            if (res.ok) {
                searchAllProducts()
                setMessage(DataMSG.msg);
                onClose()
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
            const res = await fetch(`${PRD}get/products`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            const data = await res.json();
            setAllProduct(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            setMessage(error);
        }
    };


    // Função para barra de pesquisa dos produtos
    const searchAllProducts = async (products) => {
        try {
            const value = products ? products.target.value : '';

            const res = await fetch(`${PRD}search?nameProducts=${value}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            const data = await res.json();
            console.log('data' + data)
            setAllProduct(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            setMessage(error);
        }

    }

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextProducts.Provider
            value={{
                setFormData,
                formData,
                handleSubmitProducts,
                message,
                setMessage,
                searchAllProducts,
                allProduct,
                handleUpdateProducts,
                handleDelete,
                setFormUpdate,
                formUpdate,
                setSelectedProducts,
                selectedProducts,
                setIsModalOpenDelete,
                isModalOpenDelete,
                onClose
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
