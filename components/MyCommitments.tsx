
import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface MyCommitmentsProps {
}

interface Task {
    id: number;
    tag: string;
    origin: string;
    title: string;
    date: string;
    priority: 'Alta' | 'Media' | 'Baja';
    completed: boolean;
    description: string;
}

const MyCommitments: React.FC<MyCommitmentsProps> = () => {
    // Helpers de Fecha
    const getTodayStr = () => new Date().toISOString().split('T')[0];

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return '';
        const today = getTodayStr();

        if (dateStr === today || dateStr === 'Hoy') return 'Hoy';
        if (dateStr === 'Mañana') return 'Mañana';

        // Si ya viene en formato texto legible
        if (!dateStr.includes('-') && dateStr.includes(' ')) return dateStr;

        // Intentar formatear YYYY-MM-DD
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
    };

    // Estado de datos
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            tag: '#ComunicaciónAsíncrona',
            origin: 'Replay Semanal 12/10',
            title: 'Actualizar minuta de la reunión de equipo',
            date: '2023-10-20', // ISO format simulado
            priority: 'Alta',
            completed: false,
            description: 'Es necesario revisar los puntos clave discutidos sobre el proyecto Alpha y subirlos a Confluence antes del viernes.'
        },
        {
            id: 2,
            tag: '#DocumentacionClara',
            origin: 'Ritual de Inicio',
            title: 'Preparar guía de onboarding para nuevos integrantes',
            date: '2023-10-22',
            priority: 'Media',
            completed: false,
            description: 'Crear un documento paso a paso para la configuración del entorno local y accesos a herramientas.'
        },
        {
            id: 3,
            tag: '#RespetoHorarios',
            origin: 'Acuerdo de Equipo B',
            title: 'Programar respuestas automáticas para horario no laboral',
            date: getTodayStr(), // Hoy dinámico
            priority: 'Baja',
            completed: false,
            description: 'Configurar Slack y Gmail para avisar de la desconexión a partir de las 18:00.'
        },
        {
            id: 4,
            tag: '#Feedback',
            origin: 'Ritual Mensual',
            title: 'Enviar feedback 360 a compañeros',
            date: getTodayStr(), // Hoy dinámico
            priority: 'Alta',
            completed: false,
            description: 'Completar el formulario de evaluación de desempeño para Ana y Carlos.'
        }
    ]);

    // Tareas completadas "históricas"
    const [completedHistory, setCompletedHistory] = useState<Task[]>([
        {
            id: 101,
            tag: '#Foco',
            origin: 'Replay Anterior',
            title: 'Bloquear calendario para Deep Work',
            date: 'Ayer',
            priority: 'Media',
            completed: true,
            description: 'Reservar franjas de 2 horas martes y jueves.'
        }
    ]);

    // Estados de UI
    const [filter, setFilter] = useState<'Hoy' | 'Proximos'>('Hoy');
    const [showCompleted, setShowCompleted] = useState(false);
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

    // Estado para el Modal de Detalle (Lectura)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Estados para el Formulario (Crear/Editar)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null); // null = Crear, number = Editar

    // Estados para Modal de Eliminación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    // Campos del Formulario
    const [formTitle, setFormTitle] = useState('');
    const [formPriority, setFormPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
    const [formDate, setFormDate] = useState(getTodayStr());
    const [formOrigin, setFormOrigin] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [dateError, setDateError] = useState('');

    // Referencias para clicks fuera
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpenId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Lógica de Negocio ---

    const toggleTaskCompletion = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    // Abrir modal para CREAR
    const openCreateModal = () => {
        setEditingId(null);
        setFormTitle('');
        setFormPriority('Media');
        setFormDate(getTodayStr()); // Default: Hoy
        setFormOrigin('Dashboard Personal');
        setFormDesc('');
        setDateError('');
        setIsFormOpen(true);
    };

    // Abrir modal para EDITAR
    const openEditModal = (task: Task) => {
        setEditingId(task.id);
        setFormTitle(task.title);
        setFormPriority(task.priority);
        setDateError('');

        // Intentar normalizar fecha para el input date
        let isoDate = task.date;
        if (task.date === 'Hoy') isoDate = getTodayStr();

        if (!task.date.includes('-')) {
            isoDate = getTodayStr();
        }
        setFormDate(isoDate);

        setFormOrigin(task.origin);
        setFormDesc(task.description);
        setIsFormOpen(true);
        setMenuOpenId(null); // Cerrar menú
    };

    // Validar Fecha
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setFormDate(newDate);

        if (newDate < getTodayStr()) {
            setDateError('La fecha límite no puede ser anterior a hoy.');
        } else {
            setDateError('');
        }
    };

    // Guardar (Crear o Actualizar)
    const handleSaveTask = () => {
        if (!formTitle.trim()) return;

        // Validación final antes de guardar
        if (formDate < getTodayStr()) {
            setDateError('La fecha límite no puede ser anterior a hoy.');
            return;
        }

        if (editingId) {
            // ACTUALIZAR
            setTasks(prev => prev.map(t => t.id === editingId ? {
                ...t,
                title: formTitle,
                priority: formPriority,
                date: formDate,
                origin: formOrigin,
                description: formDesc
            } : t));
        } else {
            // CREAR
            const newTask: Task = {
                id: Date.now(),
                title: formTitle,
                tag: '#Personal', // Tag por defecto para manuales
                origin: formOrigin || 'Dashboard Personal',
                date: formDate,
                priority: formPriority,
                completed: false,
                description: formDesc || 'Tarea creada manualmente.'
            };
            setTasks([newTask, ...tasks]);

            // Cambiar filtro si la tarea es para hoy
            if (formDate === getTodayStr()) setFilter('Hoy');
        }
        setIsFormOpen(false);
    };

    // Solicitar Eliminación (Abre Modal)
    const requestDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Detener propagación crítica
        e.nativeEvent.stopImmediatePropagation();
        setMenuOpenId(null);
        setTaskToDelete(id);
        setShowDeleteModal(true);
    };

    // Confirmar Eliminación
    const confirmDelete = () => {
        if (taskToDelete) {
            setTasks(prev => prev.filter(t => t.id !== taskToDelete));
        }
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    // --- Filtrado y Estadísticas ---
    const activeTasks = tasks.filter(t => !t.completed);

    const visibleTasks = activeTasks.filter(t => {
        const today = getTodayStr();
        const taskDate = t.date;

        // Lógica de comparación de fechas
        const isTaskToday = taskDate === today || taskDate === 'Hoy';

        if (filter === 'Hoy') return isTaskToday;
        if (filter === 'Proximos') return !isTaskToday;
        return true;
    });

    const recentlyCompleted = tasks.filter(t => t.completed);
    const totalTasksCount = tasks.length + completedHistory.length;
    const allCompletedCount = recentlyCompleted.length + completedHistory.length;
    const percentage = totalTasksCount === 0 ? 0 : Math.round((allCompletedCount / totalTasksCount) * 100);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Alta': return 'text-amber-600';
            case 'Media': return 'text-blue-500';
            case 'Baja': return 'text-emerald-600';
            default: return 'text-gray-500';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'Alta': return 'warning';
            case 'Media': return 'info';
            case 'Baja': return 'low_priority';
            default: return 'circle';
        }
    };

    return (
        <PageContainer>
            <PageHeader
                title="Mis Compromisos"
                subtitle="Gestiona tus tareas pendientes de los rituales Replay."
                badge={
                    <>
                        <span className="material-symbols-outlined text-sm">task_alt</span>
                        Mis Compromisos
                    </>
                }
                actionButton={
                    <button
                        className="flex items-center gap-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95"
                        onClick={openCreateModal}
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span>Nueva Tarea</span>
                    </button>
                }
            />

            {/* Progress Bar */}
            < div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-border" >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        <p className="text-text-n900 text-base font-bold leading-normal">Tareas completadas esta semana</p>
                    </div>
                    <p className="text-primary text-lg font-black">{percentage}%</p>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <p className="mt-3 text-gray-500 text-sm font-medium">{allCompletedCount} de {totalTasksCount} compromisos completados</p>
            </div >

            {/* Task List Header */}
            < div className="flex items-center justify-between" >
                <h3 className="text-text-n900 text-2xl font-bold tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined">format_list_bulleted</span>
                    Mis Tareas Pendientes
                </h3>
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-border shadow-sm">
                    <button
                        onClick={() => setFilter('Hoy')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'Hoy' ? 'bg-bg-s1 text-primary' : 'text-gray-500 hover:text-text-n900'}`}
                    >
                        Hoy
                    </button>
                    <button
                        onClick={() => setFilter('Proximos')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'Proximos' ? 'bg-bg-s1 text-primary' : 'text-gray-500 hover:text-text-n900'}`}
                    >
                        Próximos
                    </button>
                </div>
            </div >

            {/* Active Tasks List */}
            < div className="flex flex-col gap-5 min-h-[200px]" >
                {
                    visibleTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 opacity-50 border-2 border-dashed border-gray-200 rounded-2xl">
                            <span className="material-symbols-outlined text-4xl mb-2">event_available</span>
                            <p className="text-lg font-bold">¡Estás al día!</p>
                            <p className="text-sm">No tienes tareas pendientes para {filter === 'Hoy' ? 'hoy' : 'los próximos días'}.</p>
                        </div>
                    ) : (
                        visibleTasks.map((task) => (
                            <div
                                key={task.id}
                                onClick={() => handleTaskClick(task)}
                                className="group relative bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/30 hover:shadow-md transition-all flex items-start gap-5 cursor-pointer animate-fade-in"
                            >
                                <div className="mt-1" onClick={(e) => toggleTaskCompletion(e, task.id)}>
                                    <button
                                        className="size-6 rounded-lg border-2 border-primary/30 hover:border-primary flex items-center justify-center transition-colors group-hover:bg-primary/5"
                                    >
                                        <span className="material-symbols-outlined text-transparent hover:text-primary text-sm font-black">check</span>
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent-blue/15 text-accent-blue tracking-wide">
                                            {task.tag}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <span className="material-symbols-outlined text-[16px]">history</span>
                                            <span className="text-xs font-medium">Origen: {task.origin}</span>
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-text-n900 leading-tight">
                                        {task.title}
                                    </h4>

                                    <div className="flex items-center gap-6 text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">event</span>
                                            <span className="text-sm font-medium">{formatDateDisplay(task.date)}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${getPriorityColor(task.priority)}`}>
                                            <span className="material-symbols-outlined text-[18px]">{getPriorityIcon(task.priority)}</span>
                                            <span className="text-sm font-bold">Prioridad {task.priority}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3 Dots Menu */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMenuOpenId(menuOpenId === task.id ? null : task.id);
                                        }}
                                        className="p-2 text-gray-300 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>

                                    {menuOpenId === task.id && (
                                        <div ref={menuRef} className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-20 animate-fade-in overflow-hidden">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); openEditModal(task); }}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-bold text-text-n900 flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">edit</span> Editar
                                            </button>
                                            <button
                                                onClick={(e) => requestDelete(e, task.id)}
                                                className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm font-bold text-red-600 flex items-center gap-2 border-t border-gray-100"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span> Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                }
            </div >

            {/* Completed Tasks Accordion */}
            < div className="mt-8 flex flex-col items-center" >
                <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className="text-sm font-bold text-primary hover:underline flex items-center gap-2 group mb-4"
                >
                    {showCompleted ? 'Ocultar tareas completadas' : 'Ver tareas completadas'}
                    <span className={`material-symbols-outlined text-[18px] transition-transform ${showCompleted ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>keyboard_arrow_down</span>
                </button>

                {
                    showCompleted && (
                        <div className="w-full flex flex-col gap-4 animate-fade-in opacity-60 hover:opacity-100 transition-opacity">
                            {[...recentlyCompleted, ...completedHistory].map(task => (
                                <div
                                    key={task.id}
                                    className="bg-gray-50 p-4 rounded-xl border border-transparent flex items-center gap-4 select-none"
                                >
                                    <div onClick={(e) => { if (!task.origin.includes('Anterior')) toggleTaskCompletion(e, task.id); }} className="cursor-pointer">
                                        <div className="size-6 rounded-lg bg-primary border-2 border-primary flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined text-sm font-black">check</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-bold text-gray-500 line-through">{task.title}</h4>
                                        <p className="text-xs text-gray-400">Completada</p>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{task.date}</span>
                                </div>
                            ))}
                            {[...recentlyCompleted, ...completedHistory].length === 0 && (
                                <p className="text-center text-gray-400 text-sm italic">No hay tareas completadas recientemente.</p>
                            )}
                        </div>
                    )
                }
            </div >

            {/* --- MODAL DETALLE DE TAREA (Lectura) --- */}
            {
                selectedTask && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setSelectedTask(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent-blue/15 text-accent-blue tracking-wide uppercase">
                                    {selectedTask.tag.replace('#', '')}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => { setSelectedTask(null); openEditModal(selectedTask); }}
                                        className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                                        title="Editar"
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button onClick={() => setSelectedTask(null)} className="p-2 text-gray-400 hover:text-text-n900 rounded-full hover:bg-gray-100 transition-colors">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-2xl font-black text-text-n900 mb-4 leading-tight">{selectedTask.title}</h2>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Detalles</p>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedTask.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Fecha Límite</p>
                                    <p className="text-text-n900 font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">event</span>
                                        {formatDateDisplay(selectedTask.date)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Prioridad</p>
                                    <p className={`font-bold flex items-center gap-2 ${getPriorityColor(selectedTask.priority)}`}>
                                        <span className="material-symbols-outlined text-sm">{getPriorityIcon(selectedTask.priority)}</span>
                                        {selectedTask.priority}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Origen</p>
                                    <p className="text-text-n900 font-bold truncate">{selectedTask.origin}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => { toggleTaskCompletion({ stopPropagation: () => { } } as any, selectedTask.id); setSelectedTask(null); }}
                                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${selectedTask.completed ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-primary text-white hover:brightness-110 shadow-lg'}`}
                                >
                                    <span className="material-symbols-outlined">{selectedTask.completed ? 'undo' : 'check'}</span>
                                    {selectedTask.completed ? 'Marcar como pendiente' : 'Completar Tarea'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* --- MODAL FORMULARIO (Crear/Editar) --- */}
            {
                isFormOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsFormOpen(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-text-n900">
                                    {editingId ? 'Editar Compromiso' : 'Nuevo Compromiso'}
                                </h3>
                                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-text-n900"><span className="material-symbols-outlined">close</span></button>
                            </div>

                            <div className="space-y-4 mb-8">
                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Título de la tarea</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                        placeholder="Ej. Revisar documentación..."
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                {/* Fecha y Origen */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Fecha Límite</label>
                                        <input
                                            type="date"
                                            value={formDate}
                                            onChange={handleDateChange}
                                            className={`w-full p-3 border rounded-xl focus:ring-2 outline-none bg-white cursor-pointer text-gray-700 font-medium ${dateError ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary'}`}
                                        />
                                        {dateError && <p className="text-red-500 text-xs mt-1 font-bold">{dateError}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Origen</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="Ej. Dashboard"
                                            value={formOrigin}
                                            onChange={(e) => setFormOrigin(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Prioridad */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Prioridad</label>
                                    <div className="flex gap-2">
                                        {['Alta', 'Media', 'Baja'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setFormPriority(p as any)}
                                                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${formPriority === p
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        rows={3}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                                        placeholder="Detalles adicionales..."
                                        value={formDesc}
                                        onChange={(e) => setFormDesc(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSaveTask}
                                    disabled={!formTitle.trim() || !!dateError}
                                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {editingId ? 'Guardar Cambios' : 'Crear Tarea'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* --- MODAL ELIMINAR TAREA (Confirmación) --- */}
            {
                showDeleteModal && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative flex flex-col items-center text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-3xl">delete</span>
                            </div>
                            <h3 className="text-xl font-black text-text-n900 mb-2">¿Eliminar tarea?</h3>
                            <p className="text-gray-600 text-sm mb-6">Esta acción no se puede deshacer y la tarea se eliminará permanentemente de tu lista.</p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 transition-all"
                                >
                                    Sí, eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </PageContainer >
    );
};

export default MyCommitments;
