import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Mail, Lock, User, Compass, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: TouristLogin,
});

function TouristLogin() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tourist',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (isSignUp && !formData.name)) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const touristUser = {
      name: isSignUp ? formData.name : formData.email.split('@')[0],
      email: formData.email,
      role: 'tourist',
      token: 'mock-jwt-token-heritage-pass',
    };

    localStorage.setItem('tourist_user', JSON.stringify(touristUser));

    // Redirect to home route
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-amber-100 font-serif">
            Virasat Voyage
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isSignUp ? 'Create your tourist passport' : 'Welcome back, explorer'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tourist@virasatvoyage.com"
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-amber-400/80 hover:text-amber-300 transition"
                onClick={() => alert('Password reset link will be sent to your email.')}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition duration-200 cursor-pointer"
          >
            <span>{isSignUp ? 'Begin Journey' : 'Explore Heritage'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {isSignUp ? 'Already registered as a tourist?' : 'First time exploring with us?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
            }}
            className="text-amber-400 font-semibold hover:underline ml-1"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
            ← Return to Virasat Voyage Home
          </Link>
        </div>
      </div>
    </div>
  );
}