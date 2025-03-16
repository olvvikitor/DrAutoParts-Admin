import React from 'react';
import { Outlet } from 'react-router'; // Importe o Outlet

export default function LoginLayout() {
  return (
    <div className="min-h-screen flex flex-row bg-red-800">
      <main className="flex-1 px-4 py-4">
        <Outlet /> {/* Renderiza o conteúdo da rota aninhada aqui */}
      </main>
    </div>
  );
}