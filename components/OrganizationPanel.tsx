
import React, { useState, useEffect } from 'react';
import BillingSettings from './BillingSettings';
import InvitationsQueue from './InvitationsQueue';
import { Team } from '../types';

interface OrganizationPanelProps {
    onNavigateToBulkUpload?: () => void;
    onNavigateToDataExport?: () => void;
}

interface OrgUser {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Member';
    status: 'Activo' | 'Pendiente' | 'Inactivo';
    avatar?: string;
    teamId?: string;
}

const INITIAL_TEAMS: Team[] = [
    { id: 't1', name: 'Ingeniería', description: 'Desarrollo Backend, Frontend y DevOps.', memberCount: 12, color: 'bg-blue-100 text-blue-700' },
    { id: 't2', name: 'Diseño de Producto', description: 'UX, UI y Research.', memberCount: 5, color: 'bg-indigo-100 text-indigo-700' },
    { id: 't3', name: 'Operaciones', description: 'People, Finanzas y Legal.', memberCount: 3, color: 'bg-emerald-100 text-emerald-700' }
];

const INITIAL_USERS: OrgUser[] = [
    { id: '2', name: 'Ana García', email: 'ana@team.com', role: 'Manager', status: 'Activo', teamId: 't1', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: '3', name: 'Carlos Ruiz', email: 'carlos@team.com', role: 'Member', status: 'Activo', teamId: 't1', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: '4', name: 'Marta Díaz', email: 'marta@team.com', role: 'Member', status: 'Activo', teamId: 't2', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' }
];

type TabType = 'general' | 'team' | 'teams_groups' | 'billing' | 'roles' | 'settings' | 'invitations';

const AVAILABLE_PERMISSIONS = [
    { id: 'manage_team', label: 'Gestionar Equipo', desc: 'Invitar, editar y eliminar usuarios.' },
    { id: 'manage_settings', label: 'Configuración Global', desc: 'Acceso a ajustes de accesibilidad y marca.' },
    { id: 'billing', label: 'Facturación', desc: 'Ver facturas y gestionar métodos de pago.' },
    { id: 'create_agreements', label: 'Crear Acuerdos', desc: 'Publicar nuevos acuerdos vivos.' },
    { id: 'view_reports', label: 'Ver Reportes', desc: 'Acceso a métricas de salud del equipo.' },
    { id: 'manage_rituals', label: 'Gestionar Rituales', desc: 'Programar y editar sesiones de replay.' },
];

const OrganizationPanel: React.FC<OrganizationPanelProps> = ({ onNavigateToBulkUpload, onNavigateToDataExport }) => {
    const [users, setUsers] = useState<OrgUser[]>(() => {
        const saved = localStorage.getItem('demo_org_users');
        return saved ? JSON.parse(saved) : INITIAL_USERS;
    });
    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem('demo_org_teams');
        return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    });

    useEffect(() => {
        localStorage.setItem('demo_org_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('demo_org_teams', JSON.stringify(teams));
    }, [teams]);

    const [activeTab, setActiveTab] = useState<TabType>('team');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [orgName, setOrgName] = useState(() => localStorage.getItem('demo_org_name') || 'Teamworkz');
    const [orgDomain, setOrgDomain] = useState(() => localStorage.getItem('demo_org_domain') || 'teamworkz.pacto.dev');

    const [globalSettings, setGlobalSettings] = useState({
        lowStimulus: true,
        easyRead: false,
        dynamicContrast: false
    });

    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<OrgUser | null>(null);

    const [inviteEmails, setInviteEmails] = useState('');
    const [inviteRole, setInviteRole] = useState('Member');
    const [isInviting, setIsInviting] = useState(false);

    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamDesc, setNewTeamDesc] = useState('');
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);

    const [resentStatus, setResentStatus] = useState<{ [key: string]: 'idle' | 'sending' | 'sent' }>({});

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getTeamName = (teamId?: string) => teams.find(t => t.id === teamId)?.name || 'Sin Asignar';
    const getTeamColor = (teamId?: string) => teams.find(t => t.id === teamId)?.color || 'bg-gray-100 text-gray-400';
    const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmails.trim()) return;
        setIsInviting(true);
        setTimeout(() => {
            const emailsList = inviteEmails.split(/[,\n]+/).map(e => e.trim()).filter(e => e.length > 0);
            const newUsers: OrgUser[] = emailsList.map(email => ({
                id: Date.now().toString() + Math.random(),
                name: email.split('@')[0],
                email: email,
                role: inviteRole as any,
                status: 'Pendiente'
            }));
            setUsers([...users, ...newUsers]);
            setIsInviting(false);
            setShowInviteModal(false);
            setInviteEmails('');
        }, 1500);
    };

    const handleCreateTeam = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTeamName.trim()) return;
        setIsCreatingTeam(true);
        setTimeout(() => {
            const colors = ['bg-pink-100 text-pink-700', 'bg-orange-100 text-orange-700', 'bg-teal-100 text-teal-700'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const newTeam: Team = {
                id: `t-${Date.now()}`,
                name: newTeamName,
                description: newTeamDesc,
                memberCount: 0,
                color: randomColor
            };
            setTeams([...teams, newTeam]);
            setIsCreatingTeam(false);
            setShowCreateTeamModal(false);
            setNewTeamName('');
            setNewTeamDesc('');
        }, 1000);
    };

    const handleResend = (email: string) => {
        setResentStatus(prev => ({ ...prev, [email]: 'sending' }));
        setTimeout(() => {
            setResentStatus(prev => ({ ...prev, [email]: 'sent' }));
            setTimeout(() => {
                setResentStatus(prev => {
                    const newState = { ...prev };
                    delete newState[email];
                    return newState;
                });
            }, 3000);
        }, 1500);
    };

    const toggleGlobalSetting = (key: keyof typeof globalSettings) => {
        setGlobalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const SidebarButton = ({ id, icon, label }: { id: TabType, icon: string, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-4 px-6 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === id
                ? 'bg-primary text-white shadow-xl shadow-primary/30 translate-x-2'
                : 'hover:bg-primary/5 text-text-n900/50 hover:text-primary'
                }`}
        >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex flex-col lg:flex-row h-full animate-fade-in font-sans">
            {/* Sidebar Sub-Nav */}
            <aside className="w-full lg:w-80 flex-shrink-0 bg-white/40 backdrop-blur-md border-r border-black/5 flex flex-col p-8 gap-8 overflow-y-auto">
                <div className="flex items-center gap-4 px-2">
                    <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-2xl font-black">corporate_fare</span>
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-black text-text-n900 tracking-tight leading-none uppercase">Organización</h2>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Panel de Control</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-3">
                    <SidebarButton id="general" icon="info" label="General" />
                    <SidebarButton id="team" icon="group" label="Usuarios" />
                    <SidebarButton id="teams_groups" icon="groups_3" label="Equipos" />
                    <SidebarButton id="invitations" icon="mail" label="Invitaciones" />
                    <SidebarButton id="billing" icon="credit_card" label="Suscripción" />
                    <SidebarButton id="roles" icon="key" label="Seguridad" />
                    <SidebarButton id="settings" icon="palette" label="Apariencia" />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide pb-32">
                <div className="max-w-6xl mx-auto">

                    {/* TAB: GENERAL */}
                    {activeTab === 'general' && (
                        <div className="space-y-12 animate-fade-in">
                            <div className="space-y-4">
                                <h2 className="font-display text-4xl md:text-5xl font-black text-text-n900 tracking-tight uppercase">Ajustes Base</h2>
                                <p className="text-gray-400 font-bold text-lg max-w-2xl leading-relaxed italic">&ldquo;La identidad de tu espacio define la cultura de tu equipo.&rdquo;</p>
                            </div>

                            <section className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-white/60 shadow-xl shadow-primary/5 space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Nombre Legal / Público</label>
                                        <input
                                            type="text"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-5 font-black text-text-n900 outline-none transition-all shadow-inner text-xl"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Dominio de Espacio</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={orgDomain}
                                                onChange={(e) => setOrgDomain(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] pl-6 pr-40 py-5 font-black text-text-n900 outline-none transition-all shadow-inner text-xl"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-gray-400 border border-black/5">.pacto.dev</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="bg-primary text-white px-10 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                                        Actualizar Información
                                    </button>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB: USUARIOS */}
                    {activeTab === 'team' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div className="space-y-4">
                                    <h2 className="font-display text-4xl md:text-5xl font-black text-text-n900 tracking-tight uppercase">Directorio</h2>
                                    <p className="text-gray-400 font-bold text-lg max-w-2xl">Gestiona el talento y los accesos de tu organización.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowInviteModal(true)}
                                        className="bg-gradient-to-br from-primary to-secondary-s3 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:translate-y-[-2px] active:scale-95 transition-all flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-lg">person_add</span>
                                        Invitar Miembro
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white/70 backdrop-blur-md rounded-[40px] border border-white/60 shadow-xl overflow-hidden">
                                <div className="p-8 border-b border-black/5 flex flex-col md:flex-row gap-6 justify-between">
                                    <div className="relative flex-1 max-w-md">
                                        <input
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl pl-12 pr-6 py-4 font-bold text-text-n900 outline-none transition-all"
                                            placeholder="Buscar por nombre o email..."
                                        />
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-2 rounded-2xl bg-white border border-black/5 text-gray-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50">
                                            <span className="material-symbols-outlined text-lg">filter_list</span> Filtrar
                                        </button>
                                        <button
                                            onClick={onNavigateToDataExport}
                                            className="px-6 py-2 rounded-2xl bg-white border border-black/5 text-gray-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50"
                                        >
                                            <span className="material-symbols-outlined text-lg">file_download</span> Exportar
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Candidato</th>
                                                <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Equipo</th>
                                                <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Acceso</th>
                                                <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Estado</th>
                                                <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] text-right">Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5">
                                            {paginatedUsers.map((user) => (
                                                <tr key={user.id} className="group hover:bg-primary/2 transition-colors">
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-5">
                                                            <div className="size-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                                                {user.avatar ? <img src={user.avatar} className="size-full object-cover" /> : <span className="font-black text-primary text-sm">{getInitials(user.name)}</span>}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-text-n900 leading-tight text-lg">{user.name}</p>
                                                                <p className="text-sm font-bold text-gray-400">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getTeamColor(user.teamId)}`}>
                                                            {getTeamName(user.teamId)}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.role === 'Admin' ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-100' : 'bg-white text-gray-400 border-black/5'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`size-2 rounded-full ${user.status === 'Activo' ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`}></div>
                                                            <span className="text-sm font-black text-text-n900 uppercase tracking-tighter">{user.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6 text-right">
                                                        <button
                                                            onClick={() => user.status === 'Pendiente' ? handleResend(user.email) : setShowEditModal(user)}
                                                            className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${user.status === 'Pendiente' ? 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105'}`}
                                                        >
                                                            {user.status === 'Pendiente' ? (resentStatus[user.email] === 'sent' ? 'OK!' : 'Reenviar') : 'Gestionar'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="p-8 bg-gray-50/50 flex items-center justify-between">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Página {currentPage} de {totalPages}</p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="size-10 rounded-xl bg-white border border-black/5 text-gray-400 flex items-center justify-center hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                                        >
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="size-10 rounded-xl bg-white border border-black/5 text-gray-400 flex items-center justify-center hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                                        >
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: EQUIPOS */}
                    {activeTab === 'teams_groups' && (
                        <div className="space-y-12 animate-fade-in">
                            <div className="flex justify-between items-end">
                                <div className="space-y-4">
                                    <h2 className="font-display text-4xl md:text-5xl font-black text-text-n900 tracking-tight uppercase">Equipos</h2>
                                    <p className="text-gray-400 font-bold text-lg max-w-2xl">Segmenta la organización para una gestión más granular.</p>
                                </div>
                                <button
                                    onClick={() => setShowCreateTeamModal(true)}
                                    className="bg-primary text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    Nuevo Equipo
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {teams.map(team => (
                                    <div key={team.id} className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-xl shadow-primary/2 group hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`size-16 rounded-[24px] flex items-center justify-center text-3xl shadow-lg ${team.color} group-hover:scale-110 transition-transform`}>
                                                    <span className="material-symbols-outlined font-black">group</span>
                                                </div>
                                                <button className="text-gray-200 hover:text-primary p-2">
                                                    <span className="material-symbols-outlined">settings</span>
                                                </button>
                                            </div>
                                            <h3 className="font-display text-2xl font-black text-text-n900 uppercase tracking-tight mb-2">{team.name}</h3>
                                            <p className="text-gray-400 font-bold text-sm leading-relaxed mb-8 italic">&ldquo;{team.description}&rdquo;</p>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-black/5 pt-6">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-n900/40">
                                                <span className="material-symbols-outlined text-lg">person</span>
                                                {team.memberCount} Miembros
                                            </div>
                                            <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline underline-offset-4">Gestionar &rarr;</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* --- MODALS REDESIGN --- */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowInviteModal(false)}></div>
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-scale-in">
                        <div className="p-10 md:p-12 border-b border-black/5 space-y-4">
                            <h2 className="font-display text-4xl font-black text-text-n900 tracking-tight uppercase leading-none text-center">Invitar Miembros</h2>
                            <p className="text-center text-gray-400 font-bold italic">&ldquo;Abre las puertas a una colaboración consciente.&rdquo;</p>
                        </div>
                        <form onSubmit={handleInvite} className="p-10 md:p-12 space-y-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-text-n900 uppercase tracking-widest px-2">Emails del equipo (separados por coma)</label>
                                <textarea
                                    required
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] px-8 py-6 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none h-40"
                                    placeholder="pau@team.com..."
                                    value={inviteEmails}
                                    onChange={(e) => setInviteEmails(e.target.value)}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-text-n900 uppercase tracking-widest px-2">Rol Corporativo</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-8 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                >
                                    <option value="Member">Miembro Estándar</option>
                                    <option value="Manager">Líder de Equipo (Manager)</option>
                                    <option value="Admin">Administrador Global</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Cancelar</button>
                                <button type="submit" disabled={isInviting} className="flex-[2] bg-primary text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
                                    {isInviting ? 'Procesando...' : 'Enviar Invitaciones Mágicas'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizationPanel;
