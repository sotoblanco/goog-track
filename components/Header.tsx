
import React from 'react';
import { FireIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 text-center border-b border-gray-700">
      <h1 className="text-3xl font-black uppercase tracking-widest text-orange-500 flex items-center justify-center gap-2">
        <FireIcon className="w-8 h-8"/>
        Goggins Grind
      </h1>
      <p className="text-gray-400 text-sm mt-1">Don't talk about it. Be about it. Stay hard.</p>
    </header>
  );
};
