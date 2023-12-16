import './style.css'
const RegisterProducts = () => {
  return (
    <div className='register'>

    <form>
        <label htmlFor="name">Produto *</label>
        <input type="text" name="name" id="name" placeholder='Digite o nome do pruduto' required/>

        

    </form>
    </div>
  )
}

export default RegisterProducts