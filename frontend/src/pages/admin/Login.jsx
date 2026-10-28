import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { Monitor, ArrowLeft, Lock } from 'lucide-react';

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
    
    try {
      // Mock bypass for development / placeholder Firebase
      if (email === 'admin@sanjivani.tech' && password === 'admin123') {
        navigate('/admin/dashboard');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. (For offline local testing, you can use: admin@sanjivani.tech / admin123)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#E4E7EC]">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#155EEF] rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-xs">
            <Monitor className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#14213D] tracking-tight">
            Staff Portal Sign In
          </h2>
          <p className="mt-1 text-xs text-[#667085]">
            Sanjivani Computer Administration Desk
          </p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-700 p-3.5 rounded-xl text-xs border border-red-200">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-semibold text-[#344054] mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              placeholder="admin@sanjivani.tech"
              className="w-full px-3.5 py-2.5 text-sm border border-[#E4E7EC] bg-white text-[#344054] rounded-lg focus:border-[#155EEF]" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#344054] mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm border border-[#E4E7EC] bg-white text-[#344054] rounded-lg focus:border-[#155EEF]" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 px-4 rounded-xl shadow-xs text-sm font-bold text-white bg-[#155EEF] hover:bg-[#004EEB] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#E4E7EC] text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
