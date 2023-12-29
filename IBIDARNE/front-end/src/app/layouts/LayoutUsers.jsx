import { useEffect } from 'react';
import {Offcanvas,Navbar,Nav,Container } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function LayoutUsers() {
  const navigate = useNavigate()
  useEffect(()=>{
    let formateur = sessionStorage.getItem('role')
    if(formateur !== 'Participant'){
      navigate('/login')
    }
  },[])
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Users</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link><Link to='/users/home'>Home</Link></Nav.Link>
                  <Nav.Link ><Link to='/users/profile'>Profile</Link></Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}
