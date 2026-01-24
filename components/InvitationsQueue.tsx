
import React, { useState } from 'react';

const InvitationsQueue: React.FC = () => {
  const [invitations, setInvitations] = useState([
    {
        id: 1,
        initials: "AG",
        color: "bg-[#E0F2F1] text-[#00695C]",
        email: "ana.garcia@ejemplo.com",
        role: "Colaborador",
        sentDate: "12 Oct, 2023",
        status: "PENDIENTE",
        statusColor: "bg-[#FFF8E1] text-[#78350F]",
        statusDot: "bg-[#F59E0B]"
    },
    {
        id: 2,
        initials: "CM",
        color: "bg-[#F3E5F5] text-[#6A1B9A]",
        email: "carlos.m@ejemplo.com",
        role: "Admin",
        sentDate: "10 Oct, 2023",
        status: "PENDIENTE",
        statusColor: "bg-[#FFF8E1] text-[#78350F]",
        statusDot: "bg-[#F59E0B]"
    },
    {
        id: 3,
        initials: "LP",
        color: "bg-[#E3F2FD] text-[#1565C0]",
        email: "lucia.perez@ejemplo.com",
        role: "Editor",
        sentDate: "08 Oct, 2023",
        status: "RETRASADO",
        statusColor: "bg-[#FFEBEE] text-[#B71C1C]",
        statusDot: "bg-[#D32F2F]"
    },
    {
        id: 4,
        initials: "DR",
        color: "bg-[#FBE9E7] text-[#D84315]",
        email: "david.r@ejemplo.com",
        role: "Colaborador",
        sentDate: "05 Oct, 2023",
        status: "RETRASADO",
        statusColor: "bg-[#FFEBEE] text-[#B71C1C]",
        statusDot: "bg-[#D32F2F]"
    },
    {
        id: 5,
        initials: "MJ",
        color: "bg-[#E8EAF6] text-[#283593]",
        email: "marta.j@ejemplo.com",
        role: "Visualizador",
        sentDate: "01 Oct, 2023",
        status: "PENDIENTE",
        statusColor: "bg-[#FFF8E1] text-[#78350F]",
        statusDot: "bg-[#F59E0B]"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleResend = (id: number) => {
      // Logic to resend invitation
      alert(`Reenviando invitación al usuario ${id}...`);
  };

  const handleCancel = (id: number) => {
      if(confirm('¿Estás seguro de cancelar esta invitación?')) {
          setInvitations(prev => prev.filter(inv => inv.id !== id));
      }
  };

  const filteredInvitations = invitations.filter(inv => 
      inv.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-primary/10">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-black text-text-n900 tracking-tight">Invitaciones en espera</h2>
                <p className="text-gray-600 text-lg font-medium flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold">{filteredInvitations.length}</span>
                    usuarios pendientes de unirse
                </p>
            </div>
            <div className="flex gap-4">
                <div className="relative hidden md:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <span className="material-symbols-outlined">search</span>
                    </span>
                    <input 
                        className="w-64 bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 outline-none" 
                        placeholder="Buscar por correo o rol..." 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="bg-white border border-gray-200 text-text-n900 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    Invitar nuevo usuario
                </button>
            </div>
        </div>

        {/* Inclusion Tip Alert */}
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-5 flex flex-col sm:flex-row gap-4 shadow-sm items-start">
            <div className="bg-white p-2 rounded-lg text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[24px]">lightbulb</span>
            </div>
            <div className="flex-1">
                <h4 className="text-primary font-bold text-base mb-1">Consejo de inclusión</h4>
                <p className="text-text-n900/80 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
                    Un recordatorio amable puede ayudar. A veces los correos se pierden en bandejas de entrada saturadas por sobrecarga cognitiva. Considera reenviar la invitación en un horario de baja actividad.
                </p>
            </div>
        </div>

        {/* Invitations List (Cards) */}
        <div className="grid grid-cols-1 gap-4">
            {filteredInvitations.map((inv) => (
                <div key={inv.id} className="group bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-center gap-4 min-w-[30%]">
                        <div className={`size-12 rounded-full flex items-center justify-center text-lg font-bold ${inv.color}`}>
                            {inv.initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-text-n900 font-bold text-lg break-all md:break-normal">{inv.email}</span>
                            <span className="text-gray-500 text-sm">Rol: <span className="font-bold text-text-n900">{inv.role}</span></span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-8 md:flex-1">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Enviado el</span>
                            <span className="text-text-n900 font-medium">{inv.sentDate}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Estado</span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black w-fit ${inv.statusColor}`}>
                                <span className={`size-2 rounded-full ${inv.statusDot}`}></span>
                                {inv.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-none border-gray-100 mt-2 md:mt-0">
                        <button 
                            onClick={() => handleCancel(inv.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-bold px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={() => handleResend(inv.id)}
                            className="bg-primary hover:brightness-110 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 flex-1 md:flex-none justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                            Reenviar
                        </button>
                    </div>
                </div>
            ))}
            
            {filteredInvitations.length === 0 && (
                <div className="text-center py-10 opacity-50">
                    <span className="material-symbols-outlined text-5xl text-gray-300 mb-2">inbox</span>
                    <p className="text-gray-500 font-bold">No se encontraron invitaciones.</p>
                </div>
            )}
        </div>

        {/* Pagination / Footer Info */}
        <div className="flex items-center justify-center pt-4 pb-8">
            <button className="text-gray-500 hover:text-primary font-bold text-sm flex items-center gap-2 px-4 py-2 hover:bg-white rounded-lg transition-colors">
                <span>Cargar más invitaciones</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
        </div>
    </div>
  );
};

export default InvitationsQueue;
