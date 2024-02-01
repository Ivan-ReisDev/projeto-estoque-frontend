import ReactModal from 'react-modal';
import { set, useForm } from "react-hook-form";
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import './style.css'
// eslint-disable-next-line react/prop-types
const ModalCreateUser = ({ isOpen, onClose, user, handleDeleteUser }) => {
    const { message, setMessege, handleSubmitUser } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

    const onSubmit = (data) => {
        handleSubmitUser(data);
        setValue("user", "")
        console.log(`Estou aqui` + data)
    };

    const watchPassword = watch("password")
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto" className='modalCreateUser' >
            <div className='border-b-2 w-full h-{20%}'>
                <h2 className=' text-xl m-2 '>Registrar novo usuário</h2>
            </div>

            <div className='w-full flex flex-col items-center justify-center'>
                <form className='w-full h-{100%} ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='my-2 pb-2'>
                        <label htmlFor="user" className="m-0">Usuário *</label>
                        <input
                            type="text"
                            className={errors?.user?.type === "required" ? " h-9 w-full  border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                            id="user"
                            placeholder={"Digite um nome de usuário..."}
                            {...register("user", { required: true })}
                        />
                        {errors?.user && <p className="text-xs p-0 m-0 text-red-500 ">Adicione o nome de usuário.</p>}
                    </div>

                    <div className='my-2 pb-2'>
                        <label htmlFor="email" className="m-0">e-mail *</label>
                        <input
                            autoComplete="username"
                            type="email"
                            className={errors?.email?.type === "required" ? "h-9 w-full border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                            id="email"
                            placeholder={"Digite um e-mail..."}
                            {...register("email", { required: true })}
                        />
                        {errors?.email && <p className="text-xs p-0 m-0 text-red-500">Adicione um endereço de e-mail.</p>}
                    </div>

                    <div className='my-2 pb-2'>
                        <label htmlFor="password" className="m-0">Senha *</label>
                        <input
                            type="password"
                            className={errors?.password?.type === "required" ? " h-9 w-full  border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                            id="password"
                            autoComplete="new-password"
                            placeholder={"Digite o nome da categoria..."}
                            {...register("password", {
                                minLength: 8,
                                required: true
                            })}
                        />
                        {errors?.password && <p className=" text-xs p-0 m-0 text-red-500 ">A senha deve ter no minimo 8 caracteres.</p>}
                    </div>


                    <div className='my-2 pb-2'>
                        <label htmlFor="passwordConf" className="m-0">Confirmação de senha *</label>
                        <input
                            type="password"
                            autoComplete="new-passwordConfig"
                            className={errors?.passwordConf?.type === "required" ? " h-9 w-full  border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                            id="passwordConf"
                            placeholder={"Digite o nome da categoria..."}
                            {...register("passwordConf", {
                                required: true,
                                minLength: 8,
                                validate: (value) => value === watchPassword
                            })}
                        />
                        {errors?.passwordConf && <p className=" text-xs p-0 m-0  text-red-500 ">As senhas digitadas não coincidem.</p>}
                    </div>


                    <div className='my-2 pb-2'>
                        <label htmlFor="userType" className="m-0">Confirmação de senha *</label>
                        <select
                            name="userType"
                            className="w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("userType", { required: true })}
                        >
                            <option value="Usuário">Usuário</option>
                            <option value="Moderador">Moderador</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                        {errors?.userType && <p className="text-xs p-0 m-0 text-red-500">As senhas digitadas não coincidem.</p>}
                    </div>
                    {message && <p className=' text-center text-zinc-800 '>{message}</p>}
                    <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
                        <Button type='submit' className='m-2' variant='primary'> Cadastrar </Button>
                        <Button className='m-2' variant="danger" onClick={onClose}> Cancelar </Button>
                    </div>
                </form>

            </div>

        </ReactModal>
    );

}

export default ModalCreateUser;