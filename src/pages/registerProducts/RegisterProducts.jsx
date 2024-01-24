import { useContext } from "react";
import InputNew from "../../components/input/InputNew";
import "./style.css";
import { ContextProducts } from "../../Context/ProductsContext";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import { ContextCategory } from "../../Context/CategoryContext";

const RegisterProducts = () => {
  const { formData, setFormData, handleSubmitProducts, message, setMessage } = useContext(ContextProducts);
  const { allCategory } = useContext(ContextCategory);

  const handleChange = (e) => {
    setMessage('');
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
              <input
                type="text"
                name="nameProducts"
                id="nameProducts"
                value={formData.nameProducts}
                onChange={handleChange}
                placeholder={"Digite o nome do produto"}
                required
              />

              <label htmlFor="description">Descrição *</label>
              <input
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}

                placeholder="Descrição do produto"
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

              <label htmlFor="link">Link </label>
              <input
                type="url"
                name="link"
                id="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Digite o link do produto em sua loja"
              />

            </div>
            <div className="container_registerProduct-interno">
              <label htmlFor="category">Categoria *</label>
              <select name="category" id="categorySelect" onChange={handleChange} placeholder="Selecione a Categoria">
                <option value="" disabled selected>Selecione...</option>
                {allCategory &&                
                  allCategory.map((category) => (
                    <option key={category._id} value={category.category}>{category.category}</option>
                ))}

              </select>

              <label htmlFor="mark">Marca</label>
              <input
                type="text"
                name="mark"
                id="mark"
                value={formData.mark}
                onChange={handleChange}
                placeholder="Informe a marca do produto"
              />
              <label htmlFor="price">Preço *</label>
              <input
                type="number"
                step="0.01"
                name="price"
                id="price"
                value={formData.price}
                min="-1"
                onChange={handleChange}
                required  // Remove the value assignme
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
          <PrimaryButton type='submit' value={'Registrar'} />
        </form>
        <p>{message}</p>
        {console.log(allCategory)}
      </div>
    </div>
  );
};

export default RegisterProducts;
