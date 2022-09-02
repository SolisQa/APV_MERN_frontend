import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

  const { guaradarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      //Validamos los campos
      setAlerta({
        msg: "Ambos campos son obligatorios",
        error:true
      });
      return;
    }

    if(password. pwd_nuevo.length < 6){
      setAlerta({
        msg: "El Password debe tener minimo 6 caranteres",
        error:true
      });
      return;
    }

   const respuesta=  await guaradarPassword(password);
   setAlerta(respuesta)
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl text-center mt-5 mb-10">Modifica tu {""} <span className="text-blue-600 font-bold">password aqui</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alerta alerta={alerta} />}

          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label
                className="uppercase font-bold text-gray-700"
              >Password Actual:</label>
              <input
                type="password"
                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                placeholder="Password Actual"
                name="pwd_actual"
                onChange={ e =>setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}

              />
            </div>

            <div className="my-3">
              <label
                className="uppercase font-bold text-gray-700"
              >Nuevo Password:</label>
              <input
                type="password"
                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                placeholder="Nuevo Password"
                name="pwd_nuevo"
                onChange={ e =>setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}

              />
            </div>


            <button
              className="bg-blue-700 font-bold text-white uppercase w-full mt-5 py-3 px-10 rounded-lg"
            >Cambiar Password</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword
