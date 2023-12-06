import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" action="">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder={'example@example.com'} name="email" id="email" />
          <input type="password" placeholder="password" />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <br />
            <Link className="text-black underline" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage