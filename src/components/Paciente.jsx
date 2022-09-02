import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {

    const {setEdicion, eliminarPaciente } = usePacientes();

    const { nombre, propietario, email, fecha, sintomas, _id } = paciente;


    //Formatea la fecha
    const formaterarFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-CR', { dateStyle: 'long' }).format(nuevaFecha)
    }


    return (

        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-blue-800 my-2">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>

            <p className="font-bold uppercase text-blue-800 my-2">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>

            <p className="font-bold uppercase text-blue-800 my-2">Email Contancto: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>

            <p className="font-bold uppercase text-blue-800 my-2">Fecha de Alta: {''}
                <span className="font-normal normal-case text-black">{formaterarFecha(fecha)}</span>
            </p>

            <p className="font-bold uppercase text-blue-800 my-2">Sintomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button
                    className="bg-blue-600 py-2 px-10 mt-5 uppercase text-white font-bold rounded-lg"
                    onClick={ () =>setEdicion(paciente)}
                > Editar</button>

                <button
                    className="bg-red-600 py-2 px-10 mt-5 uppercase text-white font-bold rounded-lg"
                    onClick={() => eliminarPaciente(_id)}
                > Eliminar</button>
            </div>
        </div>

    )
}

export default Paciente
