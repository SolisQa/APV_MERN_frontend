
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const Registrar = () => {


  //Agregando el Registro para el State
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetiraPassword, setRepetiraPassword] = useState('');


  const [alerta, setAlerta] = useState({});


  //Validando los formularios
  const handleSubmit = async e => {

    e.preventDefault();

    if ([nombre, email, password].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error:true });
      return;
    }

    if (password !== repetiraPassword) {
      setAlerta({ msg: 'Los password no son iguales', error:true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error:true });
      return;
    }

    setAlerta({})

    //Crear el usuario en la API
    try{
      await clienteAxios.post('/veterinarios', {nombre, email, password});

      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error:false
      })

    }catch(error){
        setAlerta({
          
          msg:error.response.data.msg,
          error:true,
          
        });
    }
  
  }


  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-blue-600 text-6xl font-bold">Crea tu Cuenta y Adiministra {" "}
          <span className="text-black font-bold">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta
          alerta={alerta}
        />}
        
        <form onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <label
              className="uppercase text-gray-600 block font-bold text-xl"
            >
              Nombre
            </label>
            <input type="text"
              placeholder="Tu nombre"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-100"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <label
              className="uppercase text-gray-600 block font-bold text-xl"
            >
              Email
            </label>
            <input type="email"
              placeholder="email"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-100"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <label
              className="uppercase text-gray-600 block font-bold text-xl"
            >
              Password
            </label>
            <input type="password"
              placeholder="password"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-100"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <label
              className="uppercase text-gray-600 block font-bold text-xl"
            >
              Repetir Password
            </label>
            <input type="password"
              placeholder="password"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-100"
              value={repetiraPassword}
              onChange={e => setRepetiraPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-600 px-10 py-3 mt-5 uppercase text-white font-bold w-full rounded-xl
                 hover:bg-blue-700 hover:cursor-pointer md:w-auto"
          >
            Crear Cuenta
          </button>
        </form>


        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            ¿Ya tienes una cuenta?Inicia Sesión</Link>

          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
