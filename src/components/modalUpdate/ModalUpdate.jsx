/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import "./style.css";
import { ContextProducts } from "../../Context/ProductsContext";
import InputNew from "../input/InputNew";

// eslint-disable-next-line react/prop-types
const ModalUpdate= ({ isOpen, onClose, reserve, handleUpdateProducts }) => {
    // eslint-disable-next-line react/prop-types
    const {
        _id,
        nameProducts,
        description,
        category,
        link,
        codeSKU,
        mark,
        stock,
        price,
        localization,
    } = reserve;

    const { setFormUpdate, formUpdate, message, setMessage} =
        useContext(ContextProducts);

    useEffect(() => {
        setMessage('')
        setFormUpdate({
            _id,
            nameProducts: nameProducts || "",
            description: description || "",
            category: category || "",
            link: link || "",
            codeSKU: codeSKU || "",
            mark: mark || "",
            stock: stock || 0,
            price: price || 0,
            localization: localization || "",
        });
    }, [_id, nameProducts, description, category, link, codeSKU, mark, stock, price, localization, setFormUpdate, setMessage]);

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
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Update"
            className="modalUpdate"
        >
            <h2>Atualizar Produto</h2>
            <div className="container_modal container_update">
                <form onSubmit={handleSubmit}>
                    <div className="modalInternoPrincipal">
                        <div className="modalInterno">
                            <label htmlFor="nameProducts">Produto *</label>
                            <InputNew
                                className='inputUpdate'
                                type="text"
                                name="nameProducts"
                                id="nameProducts"
                                value={formUpdate.nameProducts}
                                handleChange={handleChange}
                                placeholder="Digite o nome do produto"
                                required
                            />

                            <label htmlFor="description">Descrição *</label>
                            <InputNew
                                name="description"
                                id="description"
                                value={formUpdate.description}
                                handleChange={handleChange}
                                required
                            />

                            <label htmlFor="stock">Estoque *</label>
                            <InputNew
                                type="number"
                                name="stock"
                                id="stock"
                                value={formUpdate.stock}
                                handleChange={handleChange}
                                required
                            />

                            <label htmlFor="codeSKU">SKU *</label>
                            <InputNew
                                type="text"
                                name="codeSKU"
                                id="codeSKU"
                                value={formUpdate.codeSKU}
                                handleChange={handleChange}
                                required
                            />

                            <label htmlFor="link">Link </label>
                            <InputNew
                                type="url"
                                name="link"
                                id="link"
                                value={formUpdate.link}
                                handleChange={handleChange}
                            />

                        </div>
                        <div className="modalInterno">

                            <label htmlFor="category">Categoria *</label>
                            <InputNew
                                type="text"
                                name="category"
                                id="category"
                                value={formUpdate.category}
                                handleChange={handleChange}
                                required
                            />

                            <label htmlFor="mark">Marca</label>
                            <InputNew
                                type="text"
                                name="mark"
                                id="mark"
                                handleChange={formUpdate.mark}
                                onChange={handleChange}
                            />
                            <label htmlFor="price">Preço *</label>
                            <InputNew
                                type="number"
                                step="0.01"
                                name="price"
                                id="price"
                                value={formUpdate.price}
                                handleChange={handleChange}
                                required
                            />

                            <label htmlFor="localization">Localização *</label>
                            <InputNew
                                type="text"
                                name="localization"
                                id="localization"
                                value={formUpdate.localization}
                                handleChange={handleChange}
                                required
                            />

                        </div>
                    </div>
                    <button className="submit" type="submit">
                        Enviar
                    </button>
                </form>
                {message ? <p>{message}</p> : []}

                <div className="close">
                    <button onClick={onClose}>X</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default ModalUpdate;
