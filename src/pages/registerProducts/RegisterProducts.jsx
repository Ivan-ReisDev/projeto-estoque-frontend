import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import { ContextCategory } from "../../Context/CategoryContext";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { ContextProducts } from "../../Context/ProductsContext";

const RegisterProducts = () => {



  const { allCategory } = useContext(ContextCategory);
  const { handleSubmitProducts, message, setMessage } = useContext(ContextProducts);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  const nameProducts = useRef(null);

  useEffect(() => {
    // Definir um temporizador para mudar a mensagem após 3 segundos
    const time = setTimeout(() => {
      setMessage('');
    }, 5000);

    // Limpando o temporizador ao desmontar o componente (componentWillUnmount)
    return () => clearTimeout(time);
  }, [message]);

  const onSubmit = (data) => {
    handleSubmitProducts(data);
    setValue("nameProducts", "")
    setValue("description", "")
    setValue("stock", "")
    setValue("codeSKU", "")
    setValue("link", "")
    setValue("category", "")
    setValue("localization", "")
    setValue("price", "")
    setValue("mark", "")
    nameProducts.current.focus()
  };
  return (
    <div className="w-screen h-[85vh] flex items-start justify-center absolute top-20  ">
      <div className="w-[800px] h-4/5 flex flex-col justify-center items-center bg-[#ffffff]">
        <h2 className="m-2">Novo produto</h2>
        <form className="h-full w-full flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-row justify-around h-full w-4/5	">
            <div className=" h-full flex flex-col justify-start w-[45%]">

              <div onMouseOver={() => setMessage('')} >
                <label htmlFor="nameProducts" className="m-0">Produto *</label>
                <input
                  ref={nameProducts}
                  type="text"
                  className={errors?.nameProducts?.type === "required" ? " h-9 w-full  border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                  id="nameProducts"

                  placeholder={"Digite o nome do produto"}
                  {...register("nameProducts", { required: true })}
                />
                {errors?.nameProducts && <p className=" text-xs p-0 m-0 text-red-500 ">Adicione o nome do produto.</p>}
              </div>

              <div>
                <label htmlFor="description" className="m-0">Descrição *</label>
                <input
                  type="text"
                  className={errors?.description?.type === "required" ? "h-9 w-full border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                  name="description"
                  id="description"
                  placeholder="Descrição do produto"
                  {...register("description", { required: true })}
                />
                {errors?.description && <p className=" text-xs p-0 m-0 text-red-500 ">Adicione a descrição do produto.</p>}
              </div>

              <div>
                <label htmlFor="stock" className="m-0">Estoque *</label>
                <input
                  className="h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  type="number"
                  name="stock"
                  id="stock"
                  min="-1"
                  placeholder="Quantidade de produtos em estoque"
                  {...register("stock")}
                />
              </div>
              <div>

                <label htmlFor="codeSKU" className="m-0">SKU *</label>
                <input
                  className="h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  name="codeSKU"
                  id="codeSKU"
                  placeholder="Código SKU (CP-6545)"
                  {...register("codeSKU")}
                />
              </div>
              <div>

                <label htmlFor="link" className="m-0">Link </label>
                <input
                  className="h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  type="url"
                  name="link"
                  id="link"
                  placeholder="Digite o link do produto em sua loja"
                  {...register("link")}
                />
              </div>

            </div>
            <div className="h-full flex flex-col justify-start w-[45%]">
              <div>

                <label htmlFor="category" className="m-0">Categoria *</label>
                <select name="category" id="categorySelect" {...register("category")}  placeholder="Selecione a Categoria" className="h-9 text-sm rounded block  border-gray-300 w-full bg-white border border-gray-300 py-2 px-3  leading-tight focus:outline-none focus:border-blue-500">
                  <option value="" >Selecione...</option>
                  {allCategory &&
                    allCategory.map((category) => (
                      <option key={category._id}  value={category.category}>{category.category}</option>
                    ))}

                </select>
              </div>

              <div>
                <label htmlFor="mark" className="m-0">Marca</label>
                <input
                  className="h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  name="mark"
                  id="mark"
                  placeholder="Informe a marca do produto"
                  {...register("mark")}
                />
              </div>

              <div>
                <label htmlFor="price" className="m-0">Preço *</label>
                <input
                  className="h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="R$ 1,00"
                  {...register("price")}
                />
              </div>

              <div>
                <label htmlFor="localization" className="m-0">Localização *</label>
                <input
                  type="text"
                  className={errors?.localization?.type === "required" ? "h-9 w-full border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "h-9 w-full border-1 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                  name="localization"
                  id="localization"
                  {...register("localization", { required: true })}
                  placeholder="Informe a localização do produto"
                />
                {errors?.localization && <p className=" text-xs p-0 m-0 text-red-500 ">Informe a localização do produto.</p>}
              </div>

            </div>

          </div>
          { message && <p className="text-cyan-950 ">{message}</p>}
          <PrimaryButton type='submit' value={"Enviar"} />
        </form>
      </div>
    </div>
  );
};

export default RegisterProducts;
