'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import Link from 'next/link';

export function UserMenu() {
  const { user, profile, signOut, loading, refresh } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  console.log(profile);

  if (loading) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!user || !profile) {
    return (
      <Link
        href="/auth/login"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
      >
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="font-medium">{profile.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-500">{profile.email}</p>
            {profile.hasPlayerProfile && profile.playerName && (
              <p className="mt-1 text-xs text-green-600">
                ⚽ Jugador: {profile.playerName}
              </p>
            )}
          </div>

          <div className="py-1">
            {!profile.hasPlayerProfile && (
              <Link
                href="/profile/create-player"
                className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
              >
                ⚽ Crear perfil de jugador
              </Link>
            )}

            {profile.hasPlayerProfile && (
              <>
                <Link
                  href="/teams"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mis Equipos
                </Link>
                <Link
                  href="/profile/player"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mi Perfil de Jugador
                </Link>
              </>
            )}

            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Configuración
            </Link>

            {profile.roles.includes('admin') && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm text-purple-600 hover:bg-gray-100"
              >
                Panel de Admin
              </Link>
            )}
          </div>

          <div className="border-t py-1">
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

