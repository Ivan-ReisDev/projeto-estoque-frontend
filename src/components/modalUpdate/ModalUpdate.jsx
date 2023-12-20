import { useContext, useEffect } from 'react'
import ReactModal from 'react-modal';
import './style.css'
import { ContextProducts } from '../../Context/ProductsContext';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve, handleUpdateProducts }) => {

    // eslint-disable-next-line react/prop-types
    const { _id, nameProducts, description, category, link, codeSKU, mark, stock, price, localization } = reserve;

    const { setFormUpdate, formUpdate, message } = useContext(ContextProducts);

    useEffect(() => {
        setFormUpdate({
            _id,
            nameProducts: nameProducts || '',
            description: description || '',
            category: category || '',
            link: link || '',
            codeSKU: codeSKU || '',
            mark: mark || '',
            stock: stock || 0,
            price: price || 0,
            localization: localization || '',
        });
    }, [_id, nameProducts, description, category, link, codeSKU, mark, stock, price, localization, setFormUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormUpdate({ ...formUpdate, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform the update
        handleUpdateProducts(_id);
    };



    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update" className='modalUpdate'>
            <h2>Atualizar Produto</h2>

            <div className='container_registerProduct'>
                <form onSubmit={handleSubmit}>


                    <label htmlFor="nameProducts">Produto *</label>
                    <input type="text" name="nameProducts" id="nameProducts" value={formUpdate.nameProducts} onChange={handleChange} placeholder='Digite o nome do produto' required />

                    <label htmlFor="description">Descrição *</label>
                    <textarea name="description" id="description" value={formUpdate.description} onChange={handleChange} required />

                    <label htmlFor="category">Categoria *</label>
                    <input type="text" name="category" id="category" value={formUpdate.category} onChange={handleChange} required />

                    <label htmlFor="link">Link </label>
                    <input type="url" name="link" id="link" value={formUpdate.link} onChange={handleChange} />

                    <label htmlFor="codeSKU">Código SKU *</label>
                    <input type="text" name="codeSKU" id="codeSKU" value={formUpdate.codeSKU} onChange={handleChange} required />

                    <label htmlFor="mark">Marca</label>
                    <input type="text" name="mark" id="mark" value={formUpdate.mark} onChange={handleChange} />

                    <label htmlFor="stock">Estoque *</label>
                    <input type="number" name="stock" id="stock" value={formUpdate.stock} onChange={handleChange} required />

                    <label htmlFor="price">Preço *</label>
                    <input type="number" step="0.01" name="price" id="price" value={formUpdate.price} onChange={handleChange} required />

                    <label htmlFor="localization">Localização *</label>
                    <input type="text" name="localization" id="localization" value={formUpdate.localization} onChange={handleChange} required />

                    <button type="submit">Enviar</button>
                </form>
                {message ? <p>{message}</p> : []}
            </div>
            <div className='close'>
                <button onClick={onClose}>X</button>
            </div>
        </ReactModal >
    );

}

export default Modal