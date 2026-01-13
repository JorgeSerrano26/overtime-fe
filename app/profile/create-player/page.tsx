'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/modules/common/client/baseClient';

export default function CreatePlayerProfilePage() {
  const { profile, refresh } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Si ya tiene perfil de jugador, redirigir
  if (profile?.hasPlayerProfile) {
    router.push('/profile/player');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await client.post('/auth/create-player-profile', {
        firstName,
        lastName,
      });

      // Refrescar datos del servidor
      refresh();

      // Redirigir al perfil de jugador
      router.push('/profile/player');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Error al crear perfil de jugador'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            ⚽ Crear Perfil de Jugador
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Completa tus datos para comenzar a jugar torneos
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Juan"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Pérez"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Perfil de Jugador'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Podrás editar esta información más tarde en tu perfil
        </p>
      </div>
    </div>
  );
}

