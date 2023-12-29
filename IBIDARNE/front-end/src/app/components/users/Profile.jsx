import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [datauser, setDataUser] = useState([]);
  const navigate = useNavigate();

  const testAuth = async () => {
    try {
      let formateur = sessionStorage.getItem('role');
      let userId = sessionStorage.getItem('id');

      if (formateur !== 'Participant') {
        navigate('/login');
      }

      const response = await axios.get(`http://localhost:3000/utilisateurs/${userId}`);
      setDataUser(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  
  
  

  useEffect(() => {
    testAuth();
  },[]);



  return (
    <>
      <div className="container">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Formation inscrit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{datauser.id}</th>
            <td>{datauser.nom}</td>
            <td>{datauser.email}</td>
            <td>{datauser.formations_inscrites}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}
