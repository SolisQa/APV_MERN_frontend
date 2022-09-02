import { useState, useEffect, createContext } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    //Definimos un UseEffect
    useEffect(() => {

        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false);

        };

        autenticarUsuario();

    }, []);

    //Para Cerrar la Sesion lo unico que necesito es eliminar el token y regresar a un objeto vacio

    const cerrarSesión = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    const acutalizarPerfil = async datos => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: "Almacenado Correctamente."
            }

        } catch (error) {
            return {
                msg: 'Ambos campos son olbigatorios',
                error: true
            }
        }

    }

    const guaradarPassword = async (datos) => {

        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try{
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);
            
            return {
                msg: data.msg
            }
        }catch(error){
            return{
                msg: "El Passwor es Incorrecto",
                error:true
            }
        }
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesión,
                acutalizarPerfil,
                guaradarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext;