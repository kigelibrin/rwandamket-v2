
"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (type) => {
    setLoading(true);
    const { data, error } = type === 'signup' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      // If login is successful, go to the dashboard
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-black mb-2 text-center">Rwandamket</h1>
        <p className="text-gray-500 text-center mb-8">Chef & Vendor Portal</p>
        
        <input 
          type="email" placeholder="Email Address" 
          className="w-full p-4 mb-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-4 mb-6 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => handleAuth('login')}
            className="w-full bg-black text-white p-4 rounded-2xl font-bold hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
          <button 
            onClick={() => handleAuth('signup')}
            className="w-full text-gray-600 text-sm font-medium p-2 hover:underline"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
