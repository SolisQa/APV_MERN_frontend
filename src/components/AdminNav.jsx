import { Link } from 'react-router-dom'; 

const AdminNav = () => {
  return (
    
        <nav className='flex gap-3'>
            <Link
                to="/admin/perfil"
                className='text-gray-600 uppercase font-bold'
            >Perfil</Link>

             <Link
                to="/admin/cambiar-paswword"
                className='text-gray-600 uppercase font-bold'
            >Cambiar Password</Link>

        </nav>
  )
}

export default AdminNav
