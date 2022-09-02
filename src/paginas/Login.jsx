import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";



const Login = () => {

  //Lugar Seguro para poder escribir mi codigo
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ alerta, setAlerta] = useState({});

  const navigate = useNavigate({});

  const {setAuth} =  useAuth();

  //Validamos los campos del Formulario
  const handleSubmit = async e =>{

      e.preventDefault();

      if([email, password].includes('')){
        setAlerta({msg: 'Todos los campos son obligatorios', error:true});
        return;
      }

      //Si la validacion pasa
      try{

        const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
        
        //Almacenamos en localStorage
        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate('/admin');

      }catch(error){

          setAlerta({
            msg: error.response.data.msg,
            error:true
          });
      }
  }


  //Extraemos el mensaje de Alerta
  const { msg } = alerta;

  return (
    <>
      <div>
          <h1 className="text-blue-700 font-bold text-6xl">Inicia Sesion y Administra {" "} 
          <span className="text-black font-bold">tus Pacientes
          </span>
          </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {/* Mostramos nuestra alerta */}
        { msg && 
          <Alerta  alerta={alerta} />
        }

        
        <form onSubmit={handleSubmit}>
          <div className="my-5">
              <label
                  className="uppercase text-gray-600 block text-xl font-bold"
              >
                  Email  
              </label>

              <input
                  type="email"
                  placeholder="Tu E-mail"
                  className="border bg-gray-100 w-full p-3 rounded-xl mt-3"
                  value={email}
                  onChange={ e => setEmail(e.target.value)}
              />
          </div>

          <div className="my-5">
              <label
                  className="uppercase text-gray-600 block text-xl font-bold"
              >
                  Password  
              </label>

              <input
                  type="password"
                  placeholder="Tu Password"
                  className="border bg-gray-100 w-full p-3 rounded-xl mt-3"
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
              />
          </div>

          <button
                className="bg-blue-600 px-10 py-3 mt-5 uppercase text-white font-bold w-full rounded-xl
                 hover:bg-blue-700 hover:cursor-pointer md:w-auto"
          >
                  Iniciar Sesión
          </button>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
                to="/registrar"
                className="block text-center my-5 text-gray-500"
            >
              ¿No tienes una cuenta?Registrate</Link>

            <Link 
                to="/olvide-password"
                className="block text-center my-5 text-gray-500"
                >  
              Olvide mi Password</Link>
        </nav>

      </div>
    </>
  );
};

export default Login
