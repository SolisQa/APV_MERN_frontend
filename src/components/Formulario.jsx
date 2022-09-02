
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

  //Agregando Stete de mi aplicacion
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  //Editar el Paciente 
  useEffect(() =>{
    
    //Llena el formulario para la Edicion
    if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setId(paciente._id)
    }

  }, [paciente])

  //Validacion del Formulario
  const handleSubmit = e => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {

      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }


    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id})
    setAlerta({
      msg: "Guardado y Editado Correctamente"
    });

    //Seteamos todos los valores para dejar el formulario en cero despues de la Edicion
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }


  //Extraemos la alerta
  const { msg } = alerta;

  return (
    <>
      <h2 className='font-black text-3xl text-center mb-5'>Administrador de Pacientes</h2>

      <p className="text-lg text-center mb-10">Añade tus Paciente y {""}
        <span className="text-blue-700 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >

        <div className="mb-5">
          <label htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Mascota:</label>

          <input
            id="nombre"
            type="text"
            placeholder="Nombre Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Propietario:</label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre Del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >
            Email:</label>

          <input
            id="email"
            type="email"
            placeholder="Email Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >
            Fecha Alta:</label>

          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas:</label>

          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 px-10 py-3 mt-5 uppercase text-white font-bold w-full rounded-xl
                 hover:bg-blue-700 hover:cursor-pointer md:w-auto"
        >{id ? 'Guardar Cambios' : ' Agregar Pacientes'}</button>

      </form>

      {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default Formulario
