import axios from "axios"
import { useState } from "react"
import { Form,Button } from "react-bootstrap"
export default function Ajouter() {
  const [titre,setTitre]=useState(null)
  const [description, setDescription] = useState(null)
  const [domaine, setDomaine] = useState(null)
  const [niveau, setNiveau] = useState(null)
  const [disponible, setDisponible] = useState(false)

  const formateur = sessionStorage.getItem('role')


  const handleAjouter=(e)=>{
    e.preventDefault()
    if(formateur==='Formateur'){
      if(disponible==="true"){
        setDisponible(true)
      }
      axios.post('http://localhost:3000/formations',{
        titre:titre,
        domaine:domaine,
        niveau:niveau,
        description:description,
        disponible:disponible
      }).then(()=>{
        alert('good job')
      })
    }
    
  }
  return (
    <>
    <h1 className="text-center">Ajouter Formation</h1>
    <Form className="container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>titre</Form.Label>
        <Form.Control type="text" placeholder="Enter titre" onChange={e=>setTitre(e.target.value)}/>
      </Form.Group>
      <div>
        <span>Choisissez un domaine</span>
        <Form.Select name="domaine " id="domaine" style={{ marginBottom: '20px',marginTop: '20px'}} onChange={e=>setDomaine(e.target.value)}>
          <option value="" disabled selected>Choose a domain...</option>
            <option value="Informatique">Informatique</option>
            <option value="Management">Management</option>
            <option value="Design">Design</option>
        </Form.Select>
      </div>
      <div>
        <span>Choisissez un niveau</span>
        <Form.Select name="niveau " id="niveau" style={{ marginBottom: '20px',marginTop: '20px'}} onChange={e=>setNiveau(e.target.value)}>
          <option value="" disabled selected>Choose a niveau...</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
        </Form.Select>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" onChange={e=>setDescription(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Disponible" value={true} onChange={e=>setDisponible(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleAjouter}>
        Submit
      </Button>
    </Form>
    </>
  )
}
