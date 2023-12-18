import { useContext } from 'react';
import './style.css';
import { ContextProducts } from '../../Context/ProductsContext';

const RegisterProducts = () => {

  const { formData, setFormData, handleSubmitProducts } = useContext(ContextProducts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (

    <div className='container_registerProduct'>
      <form onSubmit={handleSubmitProducts}>

        <label htmlFor="nameProducts">Produto *</label>
        <input type="text" name="nameProducts" id="nameProducts" value={formData.nameProducts} onChange={handleChange} placeholder='Digite o nome do produto' required />

        <label htmlFor="description">Descrição *</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="category">Categoria *</label>
        <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required />

        <label htmlFor="link">Link </label>
        <input type="url" name="link" id="link" value={formData.link} onChange={handleChange}  />

        <label htmlFor="codeSKU">Código SKU *</label>
        <input type="text" name="codeSKU" id="codeSKU" value={formData.codeSKU} onChange={handleChange} required />

        <label htmlFor="mark">Marca</label>
        <input type="text" name="mark" id="mark" value={formData.mark} onChange={handleChange}  />

        <label htmlFor="stock">Estoque *</label>
        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required />

        <label htmlFor="price">Preço *</label>
        <input type="number" step="0.01" name="price" id="price" value={formData.price} onChange={handleChange} required />

        <label htmlFor="localization">Localização *</label>
        <input type="text" name="localization" id="localization" value={formData.localization} onChange={handleChange} required />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterProducts;
