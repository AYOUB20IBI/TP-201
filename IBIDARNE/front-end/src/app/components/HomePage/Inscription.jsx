import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Inscription() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const idU = sessionStorage.getItem('id');
    const navigate =useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/utilisateurs/' + idU).then((res) => {
            console.log(res.data);
            setData(res.data);
        });

    }, []);

    const handleEnv = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/utilisateurs/' + idU, {
            nom: data.nom,
            role: data.role,
            email: data.email,
            password: data.password,
            formations_inscrites: [...data.formations_inscrites, id]
        }).then(()=>{
            confirm('are you sure!')
            navigate('/users/home')
        })
    }

    return (
        <>
            <h1 className="text-center">Inscription</h1>
            <Form className="container" onSubmit={handleEnv}>
                <Button variant="primary" type="submit">
                    Envoyer
                </Button>
            </Form>
        </>
    )
}
