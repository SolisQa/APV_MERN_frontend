import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {

    const comprobarToken = async () => {
      try {

        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: "Coloca tu nuevo password"
        });

        //El token si es valido muestra el formulario
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true
        })
      }
    }
    comprobarToken();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true
      });
      return;
    }

    //Interactuamos con la API
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg
      });
      setPasswordModificado(true);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  //Extraemos el mensaje
  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-blue-700 font-bold text-6xl">Recupera tu Password y no Pierdas {" "}
          <span className="text-black font-bold">tus Pacientes
          </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta
          alerta={alerta}
        />}

        {tokenValido && (

          <>
            <form
              onSubmit={handleSubmit}
            >
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  Nuevo Password
                </label>

                <input
                  type="password"
                  placeholder="Tu Nuevo Password"
                  className="border bg-gray-100 w-full p-3 rounded-xl mt-3"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button
                className="bg-blue-600 px-10 py-3 mt-5 uppercase text-white font-bold w-full rounded-xl
               hover:bg-blue-700 hover:cursor-pointer md:w-auto"
              >
                Guardar Nuevo Password
              </button>
            </form>
          </>
        )}

        {passwordModificado &&
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            Iniciar Sesión</Link>
        }

      </div>


    </>
  )
}

export default NuevoPassword
