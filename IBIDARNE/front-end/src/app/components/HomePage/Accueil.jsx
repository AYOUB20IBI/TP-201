
import {Container, Row,Col,Card ,Button,Form } from 'react-bootstrap';
import desing from './Accueil.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
    const [dataFormation,setDataFormation]=useState([]);
    const [searchData, setSearchData] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3000/formations')
        .then((res)=>{
            setDataFormation(res.data)
        })
    },[])

    const navigate =useNavigate()

    const searchInput = () => {
        let input = document.getElementById("search-input").value;
        const result = dataFormation.filter(item => item.titre.toLowerCase().includes(input.toLowerCase()));
        setSearchData(result)
    };

    const handleSearcheomaine = (domaine) => {
        return dataFormation.filter(item => item.domaine === domaine);
    }
    const handleSearcheniveau=(N)=>{
        return dataFormation.filter(item => item.niveau === N);
    }



    const handleInscription =(id)=>{
        let user = sessionStorage.getItem('email')
        if (user) {
            navigate(`/inscription/${id}`)
        }else{
            navigate('/login')
        }
    }

  return (
    <>
    <Container>
        <Row>
            <Col md={3} style={{padding: '20px'}}>
                {/* search input */}
                <div style={{ paddingBottom: '20px',paddingTop: '20px'}}>
                    <form style={{display: 'grid'}}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            id='search-input'
                        />
                        <Button onClick={searchInput} style={{marginTop:'20px'}} variant="outline-success">Search</Button>
                    </form>
                </div>

                {/* search domaine  */}

                <div>
                    <span>Choisissez un domaine</span>
                    <Form.Select name="domaine " id="domaine" style={{ marginBottom: '20px',marginTop: '20px'}} onChange={(e) => setSearchData(handleSearcheomaine(e.target.value))}>
                        <option value="" disabled selected>Choose a domain...</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Management">Management</option>
                        <option value="Design">Design</option>
                    </Form.Select>
                </div>

                <div>
                    <span>Choisissez un niveau</span>
                    <form style={{ marginBottom: '20px',marginTop: '20px'}} name='form1'>
                        <div style={{display: 'flex',marginBottom: '10px'}}>
                            <Form.Check type="radio"  name='niveau' value="Débutant" onChange={e=>setSearchData(handleSearcheniveau(e.target.value))}/>Débutant
                        </div>
                        <div style={{display: 'flex',marginBottom: '10px'}}>
                            <Form.Check type="radio"  name='niveau'  value="Intermédiaire" onChange={e=>setSearchData(handleSearcheniveau(e.target.value))}/>Intermédiaire
                        </div>
                        <div style={{display: 'flex',marginBottom: '10px'}}>
                            <Form.Check type="radio"  name='niveau'  value="Avancé" onChange={e=>setSearchData(handleSearcheniveau(e.target.value))}/>Avancé
                        </div>
                    </form>
                </div>

            </Col>
            <Col md={9} style={{padding: '10px'}}>
                <div className={desing.div__cards} id='afficher'>
                {searchData &&
                   searchData.map((item,index)=>(
                    <Card key={index} border="warning" style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="/images/formation1.jpg" />
                        <Card.Body>
                            <Card.Title>{item.titre}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>
                            <strong>Domaine : </strong>{item.domaine}<br></br>
                            </Card.Text>
                            {item.disponible ?
                                <Button variant="primary" onClick={() => handleInscription(item.id)}>
                                    Inscription
                                </Button>
                                :
                                <Button variant="primary">
                                    Indisponible
                                </Button>
                            }
                            <Button variant="outline-danger" disabled className='m-1'>
                                {item.niveau}
                            </Button>

                            
                        </Card.Body>
                    </Card>
                   ))
                   
                }
                {dataFormation && searchData===null &&
                    dataFormation.map((item, index) => (
                        <Card key={index} border="warning" style={{ width: '16rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="/images/formation1.jpg" />
                        <Card.Body>
                            <Card.Title>{item.titre}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>
                            <strong>Domaine : </strong>{item.domaine}<br></br>
                            </Card.Text>
                            {item.disponible ?
                                <Button variant="primary" onClick={() => handleInscription(item.id)}>
                                    Inscription
                                </Button>
                                :
                                <Button variant="primary">
                                    Indisponible
                                </Button>
                            }
                            <Button variant="outline-danger" disabled className='m-1'>
                                {item.niveau}
                            </Button>

                        </Card.Body>
                        </Card>
                    ))
                }
                </div>
            </Col>
        </Row>
    </Container>
    </>
  )
}

