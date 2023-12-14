import React, { useContext, useState } from 'react'
import  Modal from '../../components/modal/Modal' 
import { Context } from '../../Context/AuthContext';
import './style.css'

const AllProducts = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const {allProducts, formatarData} = useContext(Context)

    const openModal = (data) => {
        setSelectedProducts(data);
        setIsModalOpen(true);
      };
    
    return (
        <div className='table-Products'>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>link</th>
                        <th>Código SKU</th>
                        <th>Marca</th>
                        <th>Estoque</th>
                        <th>Localização</th>
                        <th>Preço</th>
                        {/* {profileUser.userType === "Admin" && <th>Ações</th>} */}
                    </tr>
                </thead>
                <tbody className="container_reserveALL">
                    {allProducts &&
                        Array.isArray(allProducts) &&
                        allProducts.map((product) => (
                            <tr key={product._id} >
                                <td><button onClick={ () => openModal(product)}>Ver Detalhes</button></td>
                                <td>{formatarData(product.createdAt)}</td>
                                <td>{product.nameProducts}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.codeSKU}</td>
                                <td>{product.mark}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>{product.localization}</td>
                            </tr>
                        ))}
                </tbody>

                {selectedProducts && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setSelectedProducts(null);
                setIsModalOpen(false);
              }}
              reserve={selectedProducts}
            />
          )}
               
            </table>
        </div>
    )
}

export default AllProducts