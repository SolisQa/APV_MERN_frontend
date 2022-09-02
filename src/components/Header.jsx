import { Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {

    const { cerrarSesión} = useAuth(); //Cerrar la sesión

    return (
     
        <header className="py-10 bg-blue-700">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="text-blue-300 text-2xl font-bold text-center">Administrador de Pacientes de {""}
                <span className="text-white font-black">Veterinaria</span>
                </h1>

                {/* Creamos la navegacion de mi APP */}

                <nav className='flex gap-4 flex-col lg:flex-row items-center mt-5 lg:mt-0'>
                    <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</Link>
                    <Link to="/admin/perfil" className='text-white text-sm uppercase font-bold'>Perfil</Link>
                    <button
                    type='button'
                    className='text-white text-sm uppercase font-bold'
                    onClick={cerrarSesión}>
                    Cerrar Sesión</button>
                </nav>
            </div>
        </header>
    )
  }
  
  export default Header