import { useContext, useEffect } from "react";
import "./style.css";
import { ContextProducts } from "../../Context/ProductsContext";

const RegisterProducts = () => {
  const { formData, setFormData, handleSubmitProducts, message } =
    useContext(ContextProducts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container_registerProduct">
      <div className="container_registerProductTwo">
      <h2>Registrar novo produto</h2>
      <form onSubmit={handleSubmitProducts}>
        <div className="registerProductsPrincipal">
          <div className="container_registerProduct-interno">

            <label htmlFor="nameProducts">Produto *</label>
            <input
              type="text"
              name="nameProducts"
              id="nameProducts"
              value={formData.nameProducts}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              required
            />

            <label htmlFor="codeSKU">SKU *</label>
            <input
              type="text"
              name="codeSKU"
              id="codeSKU"
              value={formData.codeSKU}
              onChange={handleChange}
              placeholder="Código SKU (CP-6545)"
              required
            />
            <label htmlFor="price">Preço *</label>
            <input
              type="number"
              step="0.01"
              name="price"
              id="price"
              value={formData.price}
              min='-1'
              onChange={handleChange}
              required
            />

            <label htmlFor="link">Link </label>
            <input
              type="url"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Digite o link do produto em sua loja"
            />

            <label htmlFor="description">Descrição *</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição do produto"
              required
            />

          </div>
          <div className="container_registerProduct-interno">
            <label htmlFor="category">Categoria *</label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Informa a categoria do produto"
              required
            />

            <label htmlFor="stock">Estoque *</label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              min='-1'
              placeholder="Quantidade de produtos em estoque"
              required
            />

            <label htmlFor="mark">Marca</label>
            <input
              type="text"
              name="mark"
              id="mark"
              value={formData.mark}
              onChange={handleChange}
              placeholder="Informe a marca do produto"
            />

            <label htmlFor="localization">Localização *</label>
            <input
              type="text"
              name="localization"
              id="localization"
              value={formData.localization}
              onChange={handleChange}
              placeholder="Informe a localização do produto"
              required
            />
          </div>
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p>{message}</p>
      </div>
    </div>
  );
};

export default RegisterProducts;
