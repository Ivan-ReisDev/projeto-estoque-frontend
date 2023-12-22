import { useContext, useState } from 'react'
import Modal from '../../components/modal/Modal'
import ModalUpdate from '../../components/modalUpdate/ModalUpdate';
import ModalDelete from '../../components/modalDelete/ModalDelete'
import { ContextProducts } from '../../Context/ProductsContext';
import { UserContext } from '../../Context/UserContext';
import { FaEye, FaSearch } from "react-icons/fa";
import { IoSettings, IoTrashBin } from "react-icons/io5";
import './style.css'
// import { CiSearch } from "react-icons/ci";

const maxItens = 20;
const maxLeft = (maxItens - 1) / 2;


const AllProducts = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState(null);

    const { allProduct, searchAllProducts, handleUpdateProducts, handleDelete, getProductsAll } = useContext(ContextProducts);
    const { profile } = useContext(UserContext);

    const openModal = (data) => {
        setSelectedProducts(data);
        setIsModalOpen(true);
    };

    const openModalUpdate = (data) => {
        setSelectedProducts(data);
        setIsModalOpenUpdate(true);
    };

    const openModalDelete = (data) => {
        setSelectedProducts(data);
        setIsModalOpenDelete(true);
    };
    
    return (
        <div className='service-details'>

            <div className='seach'>
                <div className='seach-input'>
                    <input type="text" name="seach" id="seach" placeholder='Pesquisar' onChange={(e) => searchAllProducts && searchAllProducts(e)} />
                    <span><FaSearch className='icon' /></span>
                </div>
                <select name="category" id="category">
                    <option value="category1">Categoria</option>
                    <option value="category1">Valor 1</option>
                    <option value="category3" >Valor 2</option>
                    <option value="category">Valor 3</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>SKU</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Localização</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allProduct &&
                        Array.isArray(allProduct) &&
                        allProduct.map((product) => (
                            <tr key={product._id} >
                                <td>{product.nameProducts}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.codeSKU}</td>
                                <td>{product.stock}</td>
                                <td>R$ {product.price}</td>
                                <td>{product.localization}</td>
                                <td className='btn'>
                                    <button className='btn-single btn-single-view' onClick={() => openModal(product)}><FaEye /></button>
                                    {profile.userType === "Admin" && <button className='btn-single' onClick={() => openModalUpdate(product)}><IoSettings /></button>}
                                    {profile.userType === "Admin" && <button className='btn-single btn-single-delete' onClick={() => openModalDelete(product)}><IoTrashBin /></button>}
                                    {/* {profile.userType === "Admin" && <button className='btn-single btn-single-delete' onClick={() => handleDelete(product._id)}><IoTrashBin /></button>} */}

                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

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

            {selectedProducts && (
                <ModalUpdate
                    isOpen={isModalOpenUpdate}
                    onClose={() => {
                        setSelectedProducts(null);
                        setIsModalOpenUpdate(false);
                    }}
                    reserve={selectedProducts}
                    handleUpdateProducts={handleUpdateProducts}
                />
            )}

            {selectedProducts && (
                <ModalDelete
                    isOpen={isModalOpenDelete}
                    onClose={() => {
                        setSelectedProducts(null);
                        setIsModalOpenDelete(false);
                    }}
                    reserve={selectedProducts}
                    handleDelete={handleDelete}

                />
            )}

        </div>
    )
}

export default AllProducts