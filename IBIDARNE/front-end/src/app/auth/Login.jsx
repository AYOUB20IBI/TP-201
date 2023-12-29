import {  useEffect, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    sessionStorage.clear()
  },[])

  let navigate = useNavigate();

  const handleInscription = async (e) => {
    e.preventDefault();

    if (email === '' || email === null) {
        alert('Veuillez saisir votre E-mail');
    } else if (password === '' || password === null) {
        alert('Please enter your Password');
    } else {
        try {
            const response = await axios.get('http://localhost:3000/utilisateurs');
            const users = response.data;

            const foundUser = users.find((item) => email === item.email && password === item.password);

            if (foundUser.role==='Participant') {
                sessionStorage.setItem('nom',foundUser.nom);
                sessionStorage.setItem('email',foundUser.email);
                sessionStorage.setItem('role',foundUser.role);
                sessionStorage.setItem('id',foundUser.id);
                navigate('/users/home');
            }else if (foundUser.role==='Formateur') {
              sessionStorage.setItem('nom',foundUser.nom);
              sessionStorage.setItem('email',foundUser.email);
              sessionStorage.setItem('role',foundUser.role);
              sessionStorage.setItem('id',foundUser.id);
              navigate('/formateur/home');
            }else {
                alert('Email ou mot de passe incorrect !');
            }
        } catch (error) {
            console.error('Error fetching utilisateurs:', error.message);
            alert('An error occurred while processing your request.');
        }
    }
};

  

  return (
    <>
      <div className="container text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className={styles.form__container}>
          <p className={styles.title}>INSCRIPTION DANS LA PLATEFORME</p>
          <form className={styles.form}>
            <div className={styles.input__group}>
              <label>E-mail</label>
              <input type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.input__group}>
              <label>Mot de Passe</label>
              <input type="password" placeholder="Mot de Passe" onChange={(e) => setPassword(e.target.value)} />
              <div className={styles.forgot}>
                <a rel="noopener noreferrer" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button className={styles.sign} onClick={handleInscription}>
              Inscription
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
