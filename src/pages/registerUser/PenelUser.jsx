import { Context, useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import './style.css'
import ButtonDelete from "../../components/buttonDelete/ButtonDelete"



const PenelUser = () => {
  const { profile, getUserAll } = useContext(UserContext)
  return (
    <div className="panelUser">
     
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>e-mail</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {getUserAll ?
            Array.isArray(getUserAll) &&
            getUserAll.map((user) => (
              <tr key={user._id}>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td> <ButtonDelete /> </td>
              </tr>
            )) : []}
        </tbody>

      </table>


    </div>
  )
}

export default PenelUser