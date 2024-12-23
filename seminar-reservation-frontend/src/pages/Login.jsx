import { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {

    const { email, password } = formData;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json(); 

      if (response.ok) {

        localStorage.setItem('jwtToken', responseData.token);
        setIsAuthenticated(true);
      } else {

        throw new Error(responseData.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <LoginForm onSubmit={handleSubmit} />

      <div className="mb-4 text-center">
        <button
          form="login-form"
          type="submit"
          className="btn btn-primary w-full py-2 px-4 rounded-lg text-white"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
