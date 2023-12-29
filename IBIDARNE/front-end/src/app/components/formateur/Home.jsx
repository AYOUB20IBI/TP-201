import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [datauser, setDataUser] = useState({});
  const navigate = useNavigate();

  const testAuth = async () => {
    try {
      let formateur = sessionStorage.getItem('role');
      let userId = sessionStorage.getItem('id');

      if (formateur !== 'Formateur') {
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
  }, []);

  return (
    <>
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Formations Enseignées</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{datauser.id}</th>
              <td>{datauser.nom}</td>
              <td>{datauser.email}</td>
              <td>
                {
                  datauser.formations_enseignees &&
                  datauser.formations_enseignees.map((v, index) => (
                    <span key={index}>{v}</span>
                  ))
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
