

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-blue-400 to-blue-600'}
       bg-gradient-to-r uppercase text-center text-sm text-white p-3 rounded-xl font-bold mb-10`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta
