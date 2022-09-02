
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {

    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    //En caso de que pase la validacion
    try{

      //Llamado a la API
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', {email});
      
      console.log(data);

      setAlerta({msg: data.msg})

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta; //Estraemos la alera
  return (
    <>
      <div>
        <h1 className="text-blue-600 text-6xl font-bold">Recupera tu Cuenta y Administra {" "}
          <span className="text-black font-bold">tus Pacientes</span>
        </h1>
      </div>


      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta
          alerta={alerta}
        />}
        {/* Mostramos la alerta */}

        <form
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <label
              className="uppercase text-gray-600 block font-bold text-xl"
            >
              Email
            </label>
            <input type="text"
              placeholder="Tu Email"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-100"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-600 px-10 py-3 mt-5 uppercase text-white font-bold w-full rounded-xl
                 hover:bg-blue-700 hover:cursor-pointer md:w-auto"
          >
            Recupera tus Credeciales
          </button>
        </form>


        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            ¿Ya tienes una cuenta?Inicia Sesión</Link>

          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una Cuenta?Registrate</Link>
        </nav>

      </div>


    </>
  )
}

export default OlvidePassword
