import React from 'react';
import { UserProfile } from '../types';

interface LogoutModalProps {
  user: UserProfile | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ user, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[300] bg-bg-s1 flex flex-col animate-fade-in font-display text-text-n900">
      {/* Top Navigation Mock to match design */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-bg-s1/50 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight uppercase">PACTO</h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex gap-2">
                <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </div>
            {user?.avatar ? (
                 <img src={user.avatar} alt="User" className="aspect-square object-cover rounded-full size-10 ring-2 ring-primary/20" />
            ) : (
                 <div className="bg-primary/10 text-primary rounded-full size-10 flex items-center justify-center font-bold ring-2 ring-primary/20">
                    {user?.name.charAt(0) || 'U'}
                 </div>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-[560px] w-full bg-[#fdfbf7] rounded-xl shadow-2xl shadow-primary/5 overflow-hidden border border-primary/5">
            {/* Visual Section */}
            <div className="w-full h-64 relative bg-gradient-to-b from-primary/5 to-[#fdfbf7] flex items-center justify-center overflow-hidden">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                    <div className="z-10 flex flex-col items-center">
                        <span className="material-symbols-outlined text-[120px] text-primary/40 leading-none select-none">potted_plant</span>
                        <div className="w-24 h-2 bg-primary/10 rounded-full mt-4 blur-sm"></div>
                    </div>
                </div>
            </div>
            
            <div className="p-8 md:p-12 text-center">
                <h1 className="text-text-n900 text-3xl font-bold leading-tight tracking-tight mb-4">
                    ¿Quieres tomarte un descanso?
                </h1>
                <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-sm mx-auto mb-10">
                    Tu progreso ha sido guardado de forma segura. PACTO estará aquí cuando decidas volver.
                </p>
                
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    <button 
                        onClick={onCancel}
                        className="flex items-center justify-center w-full h-14 bg-primary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-[0.98]"
                    >
                        <span>Seguir en PACTO</span>
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex items-center justify-center w-full h-14 border-2 border-primary/30 text-primary text-lg font-bold rounded-xl hover:bg-primary/5 transition-all"
                    >
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
                
                <div className="mt-8">
                    <p className="text-gray-400 text-sm font-normal opacity-70">
                        © 2026 PACTO. Tu espacio de inclusión laboral.
                    </p>
                </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 px-5 py-8 text-center bg-bg-s1/30">
        <div className="flex flex-wrap items-center justify-center gap-8">
            <button className="text-gray-500 text-sm font-medium hover:text-primary transition-colors">Privacidad</button>
            <button className="text-gray-500 text-sm font-medium hover:text-primary transition-colors">Términos</button>
            <button className="text-gray-500 text-sm font-medium hover:text-primary transition-colors">Contacto</button>
        </div>
      </footer>
    </div>
  );
};

export default LogoutModal;
