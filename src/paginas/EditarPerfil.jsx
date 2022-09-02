import { useEffect, useState} from "react";
import AdminNav from "../components/AdminNav"
//Para sacar la informacion del state usamos el hook
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const { auth, acutalizarPerfil } = useAuth();
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta] = useState({});
 
    useEffect(()=>{

            setPerfil(auth);
    }, [auth]);


    //Validamos el Formulario
    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;
        if([nombre, email].includes('')){
            setAlerta({
                msg: 'Email y nombre son obligatorios',
                error:true
            });
            return;
        }

        const resultado =  await acutalizarPerfil(perfil);
        setAlerta(resultado)
    }


    const { msg } = alerta;
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Edita tu Perfil</h2>
            <p className="text-xl text-center mt-5 mb-10">Edita tu{""} <span className="text-blue-600 font-bold">perfil aqui</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alerta alerta={alerta}/>}

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label
                                className="uppercase font-bold text-gray-700"
                            >Nombre:</label>
                            <input
                                type="text"
                                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={ e => setPerfil({
                                    ...perfil, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label
                                className="uppercase font-bold text-gray-700"
                            >Sitio Web:</label>
                            <input
                                type="text"
                                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                                name="web"
                                value={perfil.web || ''}
                                onChange={ e => setPerfil({
                                    ...perfil, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>


                        <div className="my-3">
                            <label
                                className="uppercase font-bold text-gray-700"
                            >Telefono:</label>
                            <input
                                type="text"
                                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={ e => setPerfil({
                                    ...perfil, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label
                                className="uppercase font-bold text-gray-700"
                            >Email:</label>
                            <input
                                type="email"
                                className="border bg-gray-50 rounded-lg w-full p-2 mt-5"
                                name="email"
                                value={perfil.email || ''}
                                onChange={ e => setPerfil({
                                    ...perfil, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <button
                                className="bg-blue-700 font-bold text-white uppercase w-full mt-5 py-3 px-10 rounded-lg"
                        >Guardar Cambios</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil
