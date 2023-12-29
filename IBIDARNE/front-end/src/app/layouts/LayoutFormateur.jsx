import { useEffect } from 'react';
import {Offcanvas,Navbar,Nav,Container } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function LayoutFormateur() {
  const navigate = useNavigate()
  useEffect(()=>{
    let formateur = sessionStorage.getItem('role')
    if(formateur !== 'Formateur'){
      navigate('/login')
    }
  },[])
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Formateurs </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Formateurs 
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link to='/formateur/ajouter'>Ajouter Formation</Link></Nav.Link>
                  <Nav.Link href="#action2">Supprimer Formation</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}
