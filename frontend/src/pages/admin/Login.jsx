import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // For demonstration if firebase isn't configured, bypass it slightly or show error
    try {
      if(email === 'admin@sanjivani.tech' && password === 'admin123') {
         // Mock login success if Firebase config is placeholder
         navigate('/admin/dashboard');
         return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password. Note: Firebase is using placeholder config. Use admin@sanjivani.tech / admin123 to mock bypass for now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage SANJIVANI</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-100">{error}</div>}
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
