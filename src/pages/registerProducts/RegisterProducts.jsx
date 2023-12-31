import { useContext, useEffect } from "react";
import InputNew from "../../components/input/InputNew";
import "./style.css";
import { ContextProducts } from "../../Context/ProductsContext";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";

const RegisterProducts = () => {
  const { formData, setFormData, handleSubmitProducts, message, setMessage } =
    useContext(ContextProducts);

  const handleChange = (e) => {
    setMessage('')
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container_registerProduct">
      <div className="container_registerProductTwo">
        <h2>Novo produto</h2>
        <form onSubmit={handleSubmitProducts}>
          <div className="registerProductsPrincipal">
            <div className="container_registerProduct-interno">

              <label htmlFor="nameProducts">Produto *</label>
              <InputNew
                type="text"
                name="nameProducts"
                id="nameProducts"
                value={formData.nameProducts}
                // onChange={handleChange}
                handleChange={handleChange}
                placeholder={"Digite o nome do produto"}
                required
              />

              <label htmlFor="description">Descrição *</label>
              <InputNew
                name="description"
                id="description"
                value={formData.description}
                handleChange={handleChange}
                placeholder="Descrição do produto"
                required
              />

              <label htmlFor="stock">Estoque *</label>
              <InputNew
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                handleChange={handleChange}
                min='-1'
                placeholder="Quantidade de produtos em estoque"
                required
              />


              <label htmlFor="codeSKU">SKU *</label>
              <InputNew
                type="text"
                name="codeSKU"
                id="codeSKU"
                value={formData.codeSKU}
                handleChange={handleChange}
                placeholder="Código SKU (CP-6545)"
                required
              />

              <label htmlFor="link">Link </label>
              <InputNew
                type="url"
                name="link"
                id="link"
                value={formData.link}
                handleChange={handleChange}
                placeholder="Digite o link do produto em sua loja"
              />

            </div>
            <div className="container_registerProduct-interno">
              <label htmlFor="category">Categoria *</label>
              <InputNew
                type="text"
                name="category"
                id="category"
                value={formData.category}
                handleChange={handleChange}
                placeholder="Informa a categoria do produto"
                required
              />

              <label htmlFor="mark">Marca</label>
              <InputNew
                type="text"
                name="mark"
                id="mark"
                value={formData.mark}
                handleChange={handleChange}
                placeholder="Informe a marca do produto"
              />
              <label htmlFor="price">Preço *</label>
              <InputNew
                type="number"
                step="0.01"
                name="price"
                id="price"
                value={formData.price}
                min='-1'
                handleChange={handleChange}
                required={"required"}
              />

              <label htmlFor="localization">Localização *</label>
              <InputNew
                type="text"
                name="localization"
                id="localization"
                value={formData.localization}
                handleChange={handleChange}
                placeholder="Informe a localização do produto"
                required
              />
            </div>
          </div>
          <PrimaryButton type='submit' value={'Registrar'} />
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default RegisterProducts;
