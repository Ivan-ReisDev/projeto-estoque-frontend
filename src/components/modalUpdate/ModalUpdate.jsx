import { useContext, useState } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import './style.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve, formData, setFormData,  handleUpdateProducts}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update" className='modalUpdate'>
            <h2>Atualizar Produto</h2>
            {reserve && (
                <div className='container_modal'>

                    <div className='content_Modal'>
                        <form onSubmit={handleUpdateProducts} className='formUpdate'>
                            <div className='formUpdateDiv'>
                                <label htmlFor="products">Produto</label>
                                <input type="text" id='products'  onChange={handleChange} />

                                <label htmlFor="categoryEdit">Categoria:</label>
                                <input type="text" id='categoryEdit'  onChange={handleChange} />

                                <label htmlFor="sku">SKU:</label>
                                <input type="text" id='sku'  onChange={handleChange} />

                                <label htmlFor="mark">Marca</label>
                                <input type="text" id='mark'  onChange={handleChange} />
                            </div>
                            <div className='formUpdateDiv'>
                                <label htmlFor="stock">Estoque</label>
                                <input type="text" id='stock' onChange={handleChange} />

                                <label htmlFor="price">Preço:</label>
                                <input type="text" id='price' onChange={handleChange} />

                                <label htmlFor="localization">Localização</label>
                                <input type="text" id='localization'  onChange={handleChange} />
                            </div>
                                <input type="button" value={'Atualizar'}/>
                        </form>
                    </div>


                    <div className='close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default Modal