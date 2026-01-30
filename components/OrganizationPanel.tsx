
import React, { useState, useEffect } from 'react';
import BillingSettings from './BillingSettings';
import InvitationsQueue from './InvitationsQueue';
import { Team } from '../types';

interface OrganizationPanelProps {
    onNavigateToBulkUpload?: () => void;
    onNavigateToDataExport?: () => void;
}

// Tipos locales para la gestión de usuarios
interface OrgUser {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Member';
    status: 'Activo' | 'Pendiente' | 'Inactivo';
    avatar?: string;
    teamId?: string; // Vinculación con equipo
}

const INITIAL_TEAMS: Team[] = [
    { id: 't1', name: 'Ingeniería', description: 'Desarrollo Backend, Frontend y DevOps.', memberCount: 12, color: 'bg-blue-100 text-blue-700' },
    { id: 't2', name: 'Diseño de Producto', description: 'UX, UI y Research.', memberCount: 5, color: 'bg-purple-100 text-purple-700' },
    { id: 't3', name: 'Operaciones', description: 'People, Finanzas y Legal.', memberCount: 3, color: 'bg-green-100 text-green-700' }
];

const INITIAL_USERS: OrgUser[] = [
    { id: '2', name: 'Ana García', email: 'ana@team.com', role: 'Manager', status: 'Activo', teamId: 't1', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: '3', name: 'Carlos Ruiz', email: 'carlos@team.com', role: 'Member', status: 'Activo', teamId: 't1', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: '4', name: 'Marta Díaz', email: 'marta@team.com', role: 'Member', status: 'Activo', teamId: 't2', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' }
];

type TabType = 'general' | 'team' | 'teams_groups' | 'billing' | 'roles' | 'settings' | 'invitations';

// Definición de Permisos Disponibles
const AVAILABLE_PERMISSIONS = [
    { id: 'manage_team', label: 'Gestionar Equipo', desc: 'Invitar, editar y eliminar usuarios.' },
    { id: 'manage_settings', label: 'Configuración Global', desc: 'Acceso a ajustes de accesibilidad y marca.' },
    { id: 'billing', label: 'Facturación', desc: 'Ver facturas y gestionar métodos de pago.' },
    { id: 'create_agreements', label: 'Crear Acuerdos', desc: 'Publicar nuevos acuerdos vivos.' },
    { id: 'view_reports', label: 'Ver Reportes', desc: 'Acceso a métricas de salud del equipo.' },
    { id: 'manage_rituals', label: 'Gestionar Rituales', desc: 'Programar y editar sesiones de replay.' },
];

const OrganizationPanel: React.FC<OrganizationPanelProps> = ({ onNavigateToBulkUpload, onNavigateToDataExport }) => {
    // Estado inicializado desde localStorage o valores por defecto
    const [users, setUsers] = useState<OrgUser[]>(() => {
        const saved = localStorage.getItem('demo_org_users');
        return saved ? JSON.parse(saved) : INITIAL_USERS;
    });
    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem('demo_org_teams');
        return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    });

    // Efectos para persistencia
    useEffect(() => {
        localStorage.setItem('demo_org_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('demo_org_teams', JSON.stringify(teams));
    }, [teams]);

    const [activeTab, setActiveTab] = useState<TabType>('team');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Configuración Persistente
    const [orgName, setOrgName] = useState(() => localStorage.getItem('demo_org_name') || 'Teamworkz');
    const [orgDomain, setOrgDomain] = useState(() => localStorage.getItem('demo_org_domain') || 'teamworkz.pacto.dev');

    useEffect(() => {
        localStorage.setItem('demo_org_name', orgName);
        localStorage.setItem('demo_org_domain', orgDomain);
    }, [orgName, orgDomain]);

    // Estado para la configuración global
    const [globalSettings, setGlobalSettings] = useState({
        lowStimulus: true,
        easyRead: false,
        dynamicContrast: false
    });

    // Estados para Modales
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<OrgUser | null>(null);
    const [userToDelete, setUserToDelete] = useState<OrgUser | null>(null);

    // Estados Formulario Invitación
    const [inviteEmails, setInviteEmails] = useState('');
    const [inviteRole, setInviteRole] = useState('Member');
    const [isInviting, setIsInviting] = useState(false);

    // Estados Formulario Crear Equipo
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamDesc, setNewTeamDesc] = useState('');
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);

    // Estado para Modal de Roles
    const [editingRole, setEditingRole] = useState<string | null>(null);
    const [tempPermissions, setTempPermissions] = useState<string[]>([]);

    // Estado para gestión de reenvíos
    const [resentStatus, setResentStatus] = useState<{ [key: string]: 'idle' | 'sending' | 'sent' }>({});

    // Lógica de Filtrado de Usuarios
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lógica de Paginación
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Helpers
    const getTeamName = (teamId?: string) => {
        const team = teams.find(t => t.id === teamId);
        return team ? team.name : 'Sin Asignar';
    };

    const getTeamColor = (teamId?: string) => {
        const team = teams.find(t => t.id === teamId);
        return team ? team.color : 'bg-gray-100 text-gray-600';
    };

    const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

    // Acciones
    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmails.trim()) return;

        setIsInviting(true);

        // Simular proceso de envío masivo
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
        setGlobalSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleEditRole = (roleName: string) => {
        setEditingRole(roleName);
        // Simular permisos
        let initialPerms: string[] = [];
        if (roleName === 'Admin') initialPerms = AVAILABLE_PERMISSIONS.map(p => p.id);
        else if (roleName === 'Manager') initialPerms = ['create_agreements', 'view_reports', 'manage_rituals', 'manage_team'];
        else initialPerms = ['create_agreements', 'view_reports'];
        setTempPermissions(initialPerms);
    };

    const SidebarButton = ({ id, icon, label }: { id: TabType, icon: string, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${activeTab === id
                ? 'bg-primary text-white shadow-md font-bold'
                : 'text-gray-600 hover:bg-bg-s1 hover:text-text-n900 font-medium'
                }`}
        >
            <span className={`material-symbols-outlined ${activeTab === id ? 'fill-current' : ''}`}>{icon}</span>
            <span className="text-sm">{label}</span>
        </button>
    );

    return (
        <div className="flex h-full bg-bg-s1 animate-fade-in font-display text-text-n900 overflow-hidden">

            {/* Sub-navegación Lateral */}
            <aside className="w-64 flex-shrink-0 bg-white border-r border-primary/10 flex flex-col justify-between p-6 hidden md:flex">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-black text-xl overflow-hidden shadow-lg shadow-primary/20">
                            P
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black tracking-tight leading-none uppercase italic text-text-n900">PACTO</h1>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Admin Panel</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <SidebarButton id="general" icon="info" label="General" />
                        <SidebarButton id="team" icon="group" label="Usuarios" />
                        <SidebarButton id="teams_groups" icon="groups_3" label="Equipos" />
                        <SidebarButton id="invitations" icon="mail" label="Invitaciones" />
                        <SidebarButton id="billing" icon="credit_card" label="Facturación" />
                        <SidebarButton id="roles" icon="key" label="Roles y Permisos" />
                        <SidebarButton id="settings" icon="palette" label="Personalización" />
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* --- TAB: GENERAL --- */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="pb-6 border-b border-primary/10 lg:pr-64">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit mb-2">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    Información General
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-n900">Información General</h2>
                                <p className="text-xl text-gray-600 font-medium mt-2">Configura los detalles básicos de tu espacio de trabajo.</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-primary/10 shadow-sm max-w-2xl">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-text-n900 mb-2">Nombre de la Organización</label>
                                        <input
                                            type="text"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-lg transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text-n900 mb-2">URL Personalizada</label>
                                        <div className="flex items-center">
                                            <span className="bg-gray-100 text-gray-500 font-bold p-4 rounded-l-xl border-y-2 border-l-2 border-gray-200">https://</span>
                                            <input
                                                type="text"
                                                value={orgDomain}
                                                onChange={(e) => setOrgDomain(e.target.value)}
                                                className="w-full p-4 border-2 border-gray-200 rounded-r-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-medium transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: EQUIPOS (NUEVO) --- */}
                    {activeTab === 'teams_groups' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-primary/10 lg:pr-64">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                        <span className="material-symbols-outlined text-sm">groups_3</span>
                                        Equipos
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-n900">Equipos</h2>
                                    <p className="text-xl text-gray-600 max-w-xl font-medium">Crea y gestiona grupos para organizar tus acuerdos y miembros.</p>
                                </div>
                                <button
                                    onClick={() => setShowCreateTeamModal(true)}
                                    className="inline-flex items-center gap-2 bg-primary hover:brightness-110 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 shrink-0"
                                >
                                    <span className="material-symbols-outlined">add_circle</span>
                                    Crear Equipo
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teams.map(team => (
                                    <div key={team.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`size-12 rounded-xl flex items-center justify-center ${team.color}`}>
                                                    <span className="material-symbols-outlined text-2xl">groups</span>
                                                </div>
                                                <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-50">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </div>
                                            <h3 className="text-xl font-bold text-text-n900 mb-2">{team.name}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-6">{team.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                                <span className="material-symbols-outlined text-[18px]">person</span>
                                                {team.memberCount} miembros
                                            </div>
                                            <button className="text-primary font-bold text-sm hover:underline">Gestionar</button>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty State / Add Card */}
                                <button
                                    onClick={() => setShowCreateTeamModal(true)}
                                    className="rounded-2xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group min-h-[240px]"
                                >
                                    <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span className="material-symbols-outlined text-gray-400 text-3xl group-hover:text-primary">add</span>
                                    </div>
                                    <span className="font-bold text-gray-500 group-hover:text-primary">Añadir nuevo equipo</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: INVITACIONES --- */}
                    {activeTab === 'invitations' && <InvitationsQueue />}

                    {/* --- TAB: FACTURACIÓN --- */}
                    {activeTab === 'billing' && <BillingSettings />}

                    {/* --- TAB: GESTIÓN DE USUARIOS --- */}
                    {activeTab === 'team' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-primary/10 lg:pr-64">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                        <span className="material-symbols-outlined text-sm">group</span>
                                        Directorio de Usuarios
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-n900">Directorio de Usuarios</h2>
                                    <p className="text-xl text-gray-600 max-w-xl font-medium">Administra los miembros de tu organización.</p>
                                </div>
                                <div className="flex gap-3">
                                    {onNavigateToBulkUpload && (
                                        <button
                                            onClick={onNavigateToBulkUpload}
                                            className="inline-flex items-center gap-2 bg-white border border-primary/20 text-primary font-bold py-4 px-6 rounded-full hover:bg-primary/5 transition-colors shrink-0"
                                        >
                                            <span className="material-symbols-outlined">cloud_upload</span>
                                            Importar CSV
                                        </button>
                                    )}
                                    {onNavigateToDataExport && (
                                        <button
                                            onClick={onNavigateToDataExport}
                                            className="inline-flex items-center gap-2 bg-white border border-primary/20 text-primary font-bold py-4 px-6 rounded-full hover:bg-primary/5 transition-colors shrink-0"
                                        >
                                            <span className="material-symbols-outlined">download</span>
                                            Exportar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowInviteModal(true)}
                                        className="inline-flex items-center gap-2 bg-primary hover:brightness-110 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 shrink-0"
                                    >
                                        <span className="material-symbols-outlined">person_add</span>
                                        Invitar Usuario
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-10 relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </span>
                                    <input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white border border-primary/10 rounded-xl py-4 pl-12 focus:ring-2 focus:ring-primary focus:border-primary text-text-n900 placeholder:text-gray-400 shadow-sm outline-none transition-all"
                                        placeholder="Buscar usuarios..."
                                        type="text"
                                    />
                                </div>
                                <button className="md:col-span-2 flex items-center justify-center gap-2 border border-primary/10 bg-white rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    Filtros
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-bg-s1/50 border-b border-primary/10">
                                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Miembro</th>
                                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Equipo</th>
                                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Rol</th>
                                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Estado</th>
                                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-primary/5">
                                            {paginatedUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-bg-s1/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-10 rounded-full bg-bg-s1 border border-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                                                                {user.avatar ? (
                                                                    <img src={user.avatar} alt={user.name} className="size-full object-cover" />
                                                                ) : (
                                                                    <span className="font-bold text-primary">{getInitials(user.name)}</span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-text-n900 leading-tight">{user.name}</span>
                                                                <span className="text-xs text-gray-500">{user.email}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.teamId ? (
                                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${getTeamColor(user.teamId)}`}>
                                                                {getTeamName(user.teamId)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 text-xs italic">Sin Equipo</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-tight ${user.role === 'Admin' ? 'bg-primary text-white border-primary' :
                                                            user.role === 'Manager' ? 'bg-secondary-s3 text-white border-secondary-s3' :
                                                                'bg-white text-gray-600 border-gray-200'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`size-2 rounded-full ${user.status === 'Activo' ? 'bg-green-500' : (user.status === 'Pendiente' ? 'bg-amber-500' : 'bg-gray-300')}`}></div>
                                                            <span className="text-sm font-medium text-text-n900">{user.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {user.status === 'Pendiente' ? (
                                                            <button
                                                                onClick={() => handleResend(user.email)}
                                                                disabled={resentStatus[user.email] === 'sending' || resentStatus[user.email] === 'sent'}
                                                                className={`font-black text-sm uppercase tracking-wider underline-offset-4 transition-all ${resentStatus[user.email] === 'sent'
                                                                    ? 'text-green-600 no-underline cursor-default'
                                                                    : (resentStatus[user.email] === 'sending' ? 'text-gray-400 no-underline cursor-wait' : 'text-primary hover:underline')
                                                                    }`}
                                                            >
                                                                {resentStatus[user.email] === 'sending' ? 'Enviando...' : (resentStatus[user.email] === 'sent' ? '¡Enviado!' : 'Reenviar')}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => setShowEditModal(user)}
                                                                className="text-primary font-black text-sm uppercase tracking-wider hover:underline underline-offset-4"
                                                            >
                                                                Configurar
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="px-6 py-4 bg-bg-s1/30 border-t border-primary/10 flex items-center justify-between">
                                    <p className="text-xs text-gray-500 font-bold">
                                        Mostrando {paginatedUsers.length} de {filteredUsers.length} miembros
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-full hover:bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-full hover:bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'roles' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="pb-6 border-b border-primary/10 lg:pr-64">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit mb-2">
                                    <span className="material-symbols-outlined text-sm">key</span>
                                    Roles y Permisos
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-n900">Roles y Permisos</h2>
                                <p className="text-xl text-gray-600 mt-2 font-medium">Define qué pueden hacer los diferentes niveles de usuario.</p>
                            </div>
                            <div className="grid gap-6">
                                {[{ role: 'Admin', desc: 'Acceso total a configuración, facturación y gestión de usuarios.', color: 'border-primary bg-primary/5' }, { role: 'Manager', desc: 'Puede crear rituales, gestionar acuerdos y ver reportes de equipo.', color: 'border-secondary-s3 bg-secondary-s3/5' }, { role: 'Member', desc: 'Puede participar en rituales, proponer acuerdos y editar su perfil.', color: 'border-gray-200 bg-white' }].map((r) => (
                                    <div key={r.role} className={`p-6 rounded-xl border-l-4 shadow-sm flex justify-between items-center ${r.color} bg-white`}>
                                        <div>
                                            <h3 className="font-bold text-xl text-text-n900">{r.role}</h3>
                                            <p className="text-gray-600 mt-1">{r.desc}</p>
                                        </div>
                                        <button onClick={() => handleEditRole(r.role)} className="text-primary font-bold text-sm hover:underline">Editar Permisos</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex flex-col gap-2 pb-6 border-b border-primary/10 lg:pr-64">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    <span className="material-symbols-outlined text-sm">palette</span>
                                    Accesibilidad Global
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-n900">Accesibilidad Global</h2>
                                <p className="text-xl text-gray-600 font-medium">Define estándares de visualización predeterminados para toda la organización.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Card 1 */}
                                <button
                                    type="button"
                                    className={`p-6 rounded-2xl flex flex-col justify-between gap-6 border-l-4 shadow-sm transition-all cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${globalSettings.lowStimulus ? 'bg-white border-primary border-l-primary' : 'bg-gray-100 border-gray-300 opacity-80 hover:opacity-100'}`}
                                    onClick={() => toggleGlobalSetting('lowStimulus')}
                                >
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between">
                                            <span className={`material-symbols-outlined text-3xl ${globalSettings.lowStimulus ? 'text-primary' : 'text-gray-400'}`}>brand_awareness</span>
                                            <div className={`w-12 h-6 rounded-full relative transition-colors ${globalSettings.lowStimulus ? 'bg-primary' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-md transition-all ${globalSettings.lowStimulus ? 'right-1' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg text-text-n900">Modo Bajo Estímulo</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">Fuerza una paleta de colores neutros y reduce el movimiento visual en toda la plataforma.</p>
                                    </div>
                                </button>
                                {/* Card 2 */}
                                <button
                                    type="button"
                                    className={`p-6 rounded-2xl flex flex-col justify-between gap-6 border-l-4 shadow-sm transition-all cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${globalSettings.easyRead ? 'bg-white border-primary border-l-primary' : 'bg-gray-100 border-gray-300 opacity-80 hover:opacity-100'}`}
                                    onClick={() => toggleGlobalSetting('easyRead')}
                                >
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between">
                                            <span className={`material-symbols-outlined text-3xl ${globalSettings.easyRead ? 'text-primary' : 'text-gray-400'}`}>subject</span>
                                            <div className={`w-12 h-6 rounded-full relative transition-colors ${globalSettings.easyRead ? 'bg-primary' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-md transition-all ${globalSettings.easyRead ? 'right-1' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg text-text-n900">Lectura Facilitada</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">Aumenta el interlineado y activa la tipografía Atkinson Hyperlegible por defecto.</p>
                                    </div>
                                </button>
                                {/* Card 3 */}
                                <button
                                    type="button"
                                    className={`p-6 rounded-2xl flex flex-col justify-between gap-6 border-l-4 shadow-sm transition-all cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${globalSettings.dynamicContrast ? 'bg-white border-primary border-l-primary' : 'bg-gray-100 border-gray-300 opacity-80 hover:opacity-100'}`}
                                    onClick={() => toggleGlobalSetting('dynamicContrast')}
                                >
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between">
                                            <span className={`material-symbols-outlined text-3xl ${globalSettings.dynamicContrast ? 'text-primary' : 'text-gray-400'}`}>contrast</span>
                                            <div className={`w-12 h-6 rounded-full relative transition-colors ${globalSettings.dynamicContrast ? 'bg-primary' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-md transition-all ${globalSettings.dynamicContrast ? 'right-1' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg text-text-n900">Contraste Dinámico</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">Ajusta automáticamente el contraste según la iluminación ambiental del usuario.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* --- MODAL INVITAR USUARIOS --- */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowInviteModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-8 border-b border-black/5">
                            <h1 className="text-text-n900 tracking-tight text-3xl font-black leading-tight text-center">Invitar a mi Equipo</h1>
                            <p className="text-center text-gray-500 mt-2">Envía accesos a nuevos miembros para que se unan a la organización.</p>
                        </div>
                        <form onSubmit={handleInvite} className="p-8 space-y-8 flex-1">
                            <div className="flex flex-col gap-2">
                                <label className="text-text-n900 text-base font-bold leading-normal">Correos electrónicos</label>
                                <textarea
                                    className="w-full min-w-0 flex-1 resize-none rounded-xl text-text-n900 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-300 bg-white focus:border-primary min-h-32 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                                    placeholder="juan@empresa.com, marta@empresa.com..."
                                    value={inviteEmails}
                                    onChange={(e) => setInviteEmails(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-text-n900 text-base font-bold leading-normal">Asignar Rol por Defecto</label>
                                <select
                                    className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                >
                                    <option value="Member">Miembro (Acceso estándar)</option>
                                    <option value="Manager">Manager (Gestión de equipos)</option>
                                    <option value="Admin">Admin (Control total)</option>
                                </select>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
                                <button type="button" onClick={() => setShowInviteModal(false)} className="w-full sm:w-auto px-6 py-3 rounded-xl text-text-n900 font-bold text-sm hover:bg-black/5 transition-colors">Cancelar</button>
                                <button type="submit" disabled={isInviting || !inviteEmails.trim()} className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:brightness-110 transition-all">{isInviting ? "Enviando..." : "Enviar Invitaciones"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL CREAR EQUIPO --- */}
            {showCreateTeamModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowCreateTeamModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-8 border-b border-black/5">
                            <h1 className="text-text-n900 tracking-tight text-3xl font-black leading-tight">Crear Nuevo Equipo</h1>
                            <p className="text-gray-500 mt-2">Define un nuevo grupo de trabajo para organizar acuerdos y rituales.</p>
                        </div>
                        <form onSubmit={handleCreateTeam} className="p-8 space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-text-n900 text-sm font-bold">Nombre del Equipo</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Ej. Marketing, Squad Alpha..."
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-text-n900 text-sm font-bold">Descripción (Opcional)</label>
                                <textarea
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                    placeholder="Breve descripción del propósito del equipo..."
                                    rows={3}
                                    value={newTeamDesc}
                                    onChange={(e) => setNewTeamDesc(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowCreateTeamModal(false)} className="px-5 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-colors">Cancelar</button>
                                <button type="submit" disabled={isCreatingTeam || !newTeamName.trim()} className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold shadow-md hover:brightness-110 transition-all disabled:opacity-50">
                                    {isCreatingTeam ? 'Creando...' : 'Crear Equipo'}
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
