import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';


const PacientesContext = createContext()

//PacienteProvider es de donde provienen los datos
export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({}) //Edita un paciente

    //Mando a llamar la API
    useEffect(() => {
        const obteneraPacientes = async () => {
            try {

                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);

                setPacientes(data);

            } catch (error) {
                console.log(error)
            }
        }
        obteneraPacientes()

    }, []);


    const guardarPaciente = async (paciente) => {
        //Configuarcion por ser estar check autenticado
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {

                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        } else {

            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);

                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }



    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        const confimar = confirm('¿Seguro que deseas Eliminar?');
        if (confimar) {
            try {
                //Configuarcion por ser estar check autenticado
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacienteActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

            setPacientes(pacienteActualizado);
            
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <PacientesContext.Provider

            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente, // Se necesita para poder editar los campos del formulaio
                eliminarPaciente //Eliminar el Paciente esta funcion
            }}
        >

            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;