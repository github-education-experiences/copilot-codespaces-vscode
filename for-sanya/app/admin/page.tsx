'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Response {
  _id: string;
  name: string;
  response: 'YES' | 'NO';
  message?: string;
  timestamp: string;
  userAgent?: string;
  ipAddress?: string;
}

interface Stats {
  responses: Response[];
  totalVisits: number;
  uniqueVisits: number;
  pageVisits: { _id: string; count: number }[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      setError('Failed to refresh stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshStats, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-pink-900 mb-6 text-center" style={{ fontFamily: 'Pacifico, cursive' }}>
            Admin Login 🔐
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-pink-900 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none text-pink-900"
                required
              />
            </div>

            <div>
              <label className="block text-pink-900 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none text-pink-900"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg px-6 py-3"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-900" style={{ fontFamily: 'Pacifico, cursive' }}>
            Admin Dashboard 💕
          </h1>
          <button
            onClick={refreshStats}
            disabled={loading}
            className="btn-secondary px-6 py-2"
          >
            {loading ? 'Refreshing...' : 'Refresh 🔄'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Total Visits</h3>
            <p className="text-4xl font-bold text-pink-900">{stats?.totalVisits || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Unique Visitors</h3>
            <p className="text-4xl font-bold text-pink-900">{stats?.uniqueVisits || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Responses</h3>
            <p className="text-4xl font-bold text-pink-900">{stats?.responses.length || 0}</p>
          </motion.div>
        </div>

        {/* Page Visits */}
        {stats?.pageVisits && stats.pageVisits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-pink-900 mb-4">Page Visits</h2>
            <div className="space-y-2">
              {stats.pageVisits.map((page) => (
                <div key={page._id} className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <span className="font-medium text-pink-900 capitalize">{page._id}</span>
                  <span className="text-pink-700 font-semibold">{page.count} visits</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Responses */}
        {stats?.responses && stats.responses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-pink-900 mb-4">Sanya's Responses 💌</h2>
            <div className="space-y-4">
              {stats.responses.map((response) => (
                <div
                  key={response._id}
                  className={`p-6 rounded-2xl ${
                    response.response === 'YES'
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-red-100 border-2 border-red-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-pink-900">{response.name}</h3>
                      <p className="text-sm text-pink-700">
                        {new Date(response.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-3xl font-bold ${
                        response.response === 'YES' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {response.response === 'YES' ? '✅ YES!' : '❌ NO'}
                    </span>
                  </div>

                  {response.message && (
                    <div className="mt-4 p-4 bg-white/70 rounded-xl">
                      <p className="text-sm font-semibold text-pink-700 mb-1">Message:</p>
                      <p className="text-pink-900">{response.message}</p>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-pink-600">
                    {response.ipAddress && <p>IP: {response.ipAddress}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stats?.responses && stats.responses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="text-2xl text-pink-700">No responses yet... waiting for Sanya 💕</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
