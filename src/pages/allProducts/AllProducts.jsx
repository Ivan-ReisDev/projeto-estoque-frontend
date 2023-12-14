import { useContext, useState } from 'react'
import Modal from '../../components/modal/Modal'
import { Context } from '../../Context/AuthContext';
import './style.css'

const AllProducts = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const { allProducts, formatarData } = useContext(Context)

    const openModal = (data) => {
        setSelectedProducts(data);
        setIsModalOpen(true);
    };

    return (
        <div className='service-details'>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>SKU</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Localização</th>
                        <th></th>
                        {/* {profileUser.userType === "Admin" && <th>Ações</th>} */}
                    </tr>
                </thead>
                <tbody>
                    {allProducts &&
                        Array.isArray(allProducts) &&
                        allProducts.map((product) => (
                            <tr key={product._id} >
                                <td>{formatarData(product.createdAt)}</td>
                                <td>{product.nameProducts}</td>
                                <td>{product.category}</td>
                                <td>{product.codeSKU}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>{product.localization}</td>
                                <td><button onClick={() => openModal(product)}>Ver Detalhes</button></td>
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