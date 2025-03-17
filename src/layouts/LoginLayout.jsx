import React from 'react';
import { Outlet } from 'react-router'; // Importe o Outlet

export default function LoginLayout() {
  return (
    <div className="h-screen flex flex-row ">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}