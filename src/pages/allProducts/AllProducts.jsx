import { useContext, useState } from 'react'
import Modal from '../../components/modal/Modal'
import { Context } from '../../Context/AuthContext';
import { FaEye, FaSearch } from "react-icons/fa";
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";



import './style.css'

const AllProducts = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const { allProducts, formatarData, profile } = useContext(Context)

    const openModal = (data) => {
        setSelectedProducts(data);
        setIsModalOpen(true);
    };

    return (
        <div className='service-details'>

            <div className='seach'>
                <div className='seach-input'>
                    <input type="text" name="seach" id="seach" placeholder='Pesquisar' />
                    <span><FaSearch className='icon' /></span>
                </div>
                <select name="category" id="category">
                    <option value="category1">Categoria</option>
                    <option value="category1">Valor 1</option>
                    <option value="category3" selected>Valor 2</option>
                    <option value="category">Valor 3</option>
                </select>
            </div>
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
                        {profile.userType === "Admin" && <th>Ações</th>}
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
                                <td>R$ {product.price}</td>
                                <td>{product.localization}</td>
                                <td className='btn'>
                                    <button className='btn-single btn-single-view' onClick={() => openModal(product)}><FaEye /></button>
                                    <button className='btn-single' onClick={() => openModal(product)}><IoSettings /></button>
                                    <button className='btn-single btn-single-delete' onClick={() => openModal(product)}><IoTrashBin /></button></td>
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
        </div>
    )
}

export default AllProducts