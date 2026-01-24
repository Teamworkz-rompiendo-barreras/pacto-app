
import React, { useState } from 'react';

interface TeamPrivacySettingsProps {
  onBack: () => void;
  onSave: () => void;
  userAvatar?: string;
}

const TeamPrivacySettings: React.FC<TeamPrivacySettingsProps> = ({ onBack, onSave, userAvatar }) => {
  const [agreementVisibility, setAgreementVisibility] = useState('team');
  const [preferenceAccess, setPreferenceAccess] = useState('Todo el Equipo');
  const [forceAnonymity, setForceAnonymity] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        onSave();
    }, 1500);
  };

  return (
    <div className="bg-bg-s1 min-h-screen flex flex-col font-display text-text-n900 animate-fade-in">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={onBack}>
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-[20px]">diversity_3</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-primary">PACTO</span>
                        </div>
                        {/* Nav Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <button onClick={onBack} className="border-transparent text-gray-500 hover:text-primary hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Dashboard
                            </button>
                            <button onClick={onBack} className="border-transparent text-gray-500 hover:text-primary hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Equipo
                            </button>
                            <span className="border-primary text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold">
                                Ajustes de Privacidad
                            </span>
                        </div>
                    </div>
                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-primary p-2 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-cover bg-center border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
                             {userAvatar ? (
                                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                                <span className="material-symbols-outlined text-gray-400">person</span>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li><button onClick={onBack} className="hover:text-primary hover:underline">Inicio</button></li>
                    <li><span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span></li>
                    <li><button onClick={onBack} className="hover:text-primary hover:underline">Equipo</button></li>
                    <li><span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span></li>
                    <li aria-current="page" className="font-bold text-primary">Ajustes de Privacidad</li>
                </ol>
            </nav>

            {/* Page Header */}
            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-black text-text-n900 mb-3 tracking-tight">Ajustes de Privacidad del Equipo</h1>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed font-medium">
                    Gestiona quién puede ver la información de tu equipo, cómo se comparten las preferencias sensoriales y configura el nivel de anonimato para fomentar un entorno seguro.
                </p>
            </header>

            {/* Psychological Safety Tip */}
            <div className="bg-[#EEF2FF] border-l-4 border-primary rounded-r-lg p-6 mb-10 flex items-start gap-4 shadow-sm" role="alert">
                <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[24px]">psychology</span>
                </div>
                <div>
                    <h3 className="text-primary font-bold text-lg mb-1">Tip de Seguridad Psicológica</h3>
                    <p className="text-text-n900 leading-relaxed font-medium text-sm md:text-base">
                        Equilibrar la transparencia con la privacidad es clave. Permitir que los miembros controlen quién ve sus necesidades sensoriales aumenta la confianza y reduce la ansiedad social, creando un espacio más inclusivo para la neurodiversidad.
                    </p>
                </div>
            </div>

            {/* Settings Container */}
            <form className="space-y-8" onSubmit={handleSave}>
                
                {/* Card 1: Agreement Visibility */}
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-primary rounded-lg">
                            <span className="material-symbols-outlined">visibility</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-n900">Visibilidad de los Acuerdos</h2>
                    </div>
                    <p className="text-gray-500 mb-6 text-base font-medium">Define quién tiene acceso para ver los acuerdos de trabajo y normas de convivencia establecidos por este equipo.</p>
                    <div className="space-y-4">
                        <label className={`relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-all group ${agreementVisibility === 'team' ? 'border-primary bg-blue-50/30' : 'border-gray-200 hover:border-primary/50'}`}>
                            <div className="flex items-center h-5">
                                <input 
                                    type="radio" 
                                    name="visibility" 
                                    value="team" 
                                    checked={agreementVisibility === 'team'}
                                    onChange={(e) => setAgreementVisibility(e.target.value)}
                                    className="h-5 w-5 text-primary border-gray-300 focus:ring-primary focus:ring-offset-0 accent-primary"
                                />
                            </div>
                            <div className="ml-4 flex flex-col">
                                <span className={`block text-lg font-bold ${agreementVisibility === 'team' ? 'text-primary' : 'text-text-n900'}`}>Solo miembros del equipo</span>
                                <span className="block text-gray-500 mt-1 text-sm">Los acuerdos son privados y visibles solo para los integrantes actuales. Recomendado para equipos en formación.</span>
                            </div>
                        </label>
                        <label className={`relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-all group ${agreementVisibility === 'org' ? 'border-primary bg-blue-50/30' : 'border-gray-200 hover:border-primary/50'}`}>
                            <div className="flex items-center h-5">
                                <input 
                                    type="radio" 
                                    name="visibility" 
                                    value="org" 
                                    checked={agreementVisibility === 'org'}
                                    onChange={(e) => setAgreementVisibility(e.target.value)}
                                    className="h-5 w-5 text-primary border-gray-300 focus:ring-primary focus:ring-offset-0 accent-primary"
                                />
                            </div>
                            <div className="ml-4 flex flex-col">
                                <span className={`block text-lg font-bold ${agreementVisibility === 'org' ? 'text-primary' : 'text-text-n900'}`}>Toda la organización</span>
                                <span className="block text-gray-500 mt-1 text-sm">Cualquier persona de la organización puede consultar los acuerdos. Ideal para fomentar la transparencia cultural.</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Card 2: Preference Sharing */}
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
                            <span className="material-symbols-outlined">person_search</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-n900">Compartición de Preferencias Individuales</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <label className="block text-lg font-bold text-text-n900 mb-2" htmlFor="preferences-access">
                                ¿Quién puede ver las preferencias sensoriales por defecto?
                            </label>
                            <p className="text-gray-500 mb-4 text-sm font-medium">
                                Esto determina la visibilidad predeterminada de perfiles de comunicación y sensoriales (ej. sensibilidad al ruido, preferencia de comunicación escrita). Los usuarios siempre pueden anular esto individualmente.
                            </p>
                        </div>
                        <div className="md:col-span-1">
                            <div className="relative">
                                <select 
                                    id="preferences-access" 
                                    name="preferences-access"
                                    value={preferenceAccess}
                                    onChange={(e) => setPreferenceAccess(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg shadow-sm bg-gray-50 hover:bg-white transition-colors cursor-pointer text-text-n900 font-bold border"
                                >
                                    <option>Solo Managers</option>
                                    <option>Todo el Equipo</option>
                                    <option>Nadie (Privado)</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Anonymity Settings */}
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                            <span className="material-symbols-outlined">incognito</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-n900">Anonimato en el Buzón de Sugerencias</h2>
                    </div>
                    <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-text-n900 mb-1">Forzar anonimato al 100%</h3>
                            <p className="text-gray-500 text-sm font-medium">
                                Si se activa, el sistema eliminará cualquier metadato (timestamps exactos, IP) que pudiera rastrear una sugerencia hasta un usuario específico. Esto aumenta la seguridad psicológica para dar feedback crítico.
                            </p>
                        </div>
                        {/* Toggle Switch */}
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer relative" htmlFor="toggle-anonymity">
                                <input 
                                    type="checkbox" 
                                    id="toggle-anonymity" 
                                    className="sr-only peer"
                                    checked={forceAnonymity}
                                    onChange={(e) => setForceAnonymity(e.target.checked)}
                                />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="sticky bottom-4 z-40">
                    <div className="bg-text-n900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto border border-gray-700">
                        <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                            <span className="material-symbols-outlined text-yellow-400">info</span>
                            <span>Los cambios se aplicarán inmediatamente para todo el equipo.</span>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button 
                                type="button"
                                onClick={onBack}
                                className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-500 rounded-lg text-sm font-bold text-white hover:bg-gray-700 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 sm:flex-none px-6 py-2.5 bg-primary hover:brightness-110 rounded-lg text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <span>Guardar Cambios</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Footer Info */}
            <div className="mt-12 text-center border-t border-gray-300 pt-8">
                <p className="text-gray-500 text-sm font-bold">
                    © 2026 PACTO. Diseñado para la inclusión.
                    <button className="text-primary hover:underline ml-2">Centro de Ayuda</button>
                </p>
            </div>
        </main>
    </div>
  );
};

export default TeamPrivacySettings;
