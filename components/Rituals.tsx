
import React, { useState, useRef, useEffect } from 'react';
import { Ritual } from '../types';
import { useLanguage } from '../LanguageContext';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface RitualsProps {
    rituals: Ritual[];
    onCreate: () => void;
    onViewDetails: (ritual: Ritual) => void;
    onToggleStatus: (id: number) => void;
    onViewHistory?: () => void;
    onStartPreparation?: () => void;
}

const Rituals: React.FC<RitualsProps> = ({ rituals, onCreate, onViewDetails, onToggleStatus, onViewHistory, onStartPreparation }) => {
    const { t } = useLanguage();
    const [activeView, setActiveView] = useState<'programados' | 'preparacion' | 'borradores' | 'archivados'>('programados');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getRitualStyles = (type: string) => {
        switch (type) {
            case 'replay':
                return { border: 'border-secondary-s3', bg: 'bg-secondary-s3/5', icon: 'groups', color: 'text-secondary-s3', label: t('ritual.type.sync') };
            case 'focus':
                return { border: 'border-indigo-400', bg: 'bg-indigo-50/50', icon: 'do_not_disturb_on', color: 'text-indigo-500', label: t('ritual.type.focus') };
            case 'social':
                return { border: 'border-primary', bg: 'bg-primary/5', icon: 'coffee', color: 'text-primary', label: t('ritual.type.social') };
            case 'edit':
            default:
                return { border: 'border-p1', bg: 'bg-p1/10', icon: 'edit_note', color: 'text-primary', label: t('ritual.type.strategy') };
        }
    };

    const ritualCount = rituals.filter(r => r.status === 'pending').length;
    const energyLevel = ritualCount > 3 ? t('ritual.energy.level.high') : (ritualCount > 1 ? t('ritual.energy.level.medium') : t('ritual.energy.level.optimal'));
    const energyColor = ritualCount > 3 ? 'from-secondary-s3 to-primary' : (ritualCount > 1 ? 'from-amber-400 to-primary' : 'from-green-400 to-green-600');

    const getViewLabel = () => {
        switch (activeView) {
            case 'programados': return t('ritual.view.scheduled');
            case 'preparacion': return t('ritual.view.prep');
            case 'borradores': return t('ritual.view.drafts');
            case 'archivados': return t('ritual.view.archived');
            default: return t('ritual.view.label');
        }
    };

    return (
        <PageContainer>
            <PageHeader
                title={t('ritual.title')}
                subtitle={t('ritual.desc')}
                actionButton={
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md border border-white/60 rounded-[20px] text-text-n900 font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all shadow-sm min-w-[200px] justify-between group"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        {activeView === 'programados' ? 'calendar_month' : (activeView === 'preparacion' ? 'fact_check' : (activeView === 'borradores' ? 'edit_note' : 'inventory_2'))}
                                    </span>
                                    {getViewLabel()}
                                </span>
                                <span className={`material-symbols-outlined text-gray-300 transition-transform ${showDropdown ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl border border-black/5 overflow-hidden z-20 animate-fade-in flex flex-col p-2">
                                    {[
                                        { id: 'programados', icon: 'calendar_month', label: t('ritual.view.scheduled') },
                                        { id: 'preparacion', icon: 'fact_check', label: t('ritual.view.prep'), count: 1 },
                                        { id: 'borradores', icon: 'edit_note', label: t('ritual.view.drafts') },
                                        { id: 'archivados', icon: 'inventory_2', label: t('ritual.view.archived') }
                                    ].map((view) => (
                                        <button
                                            key={view.id}
                                            onClick={() => { setActiveView(view.id as any); setShowDropdown(false); }}
                                            className={`px-4 py-4 rounded-xl text-left text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 flex items-center gap-4 transition-all ${activeView === view.id ? 'text-primary bg-primary/5' : 'text-gray-400'}`}
                                        >
                                            <span className="material-symbols-outlined text-xl">{view.icon}</span>
                                            {view.label}
                                            {view.count && <span className="ml-auto bg-primary text-white text-[8px] size-4 rounded-full flex items-center justify-center">{view.count}</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onCreate}
                            className="bg-gradient-to-br from-primary to-secondary-s3 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            {t('ritual.btn.schedule')}
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                <div className="lg:col-span-8 flex flex-col gap-10">
                    {activeView === 'programados' && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-4 px-4">
                                <h3 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">{t('ritual.section.today')}</h3>
                                <div className="h-px flex-1 bg-gradient-to-r from-black/5 to-transparent"></div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${energyLevel === t('ritual.energy.level.high') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-green-100 text-green-700'}`}>
                                    {t('ritual.energy.load')}: {ritualCount > 0 ? energyLevel : t('ritual.energy.level.low')}
                                </span>
                            </div>

                            {rituals.length === 0 ? (
                                <div className="bg-white/40 backdrop-blur-md p-24 rounded-[40px] border-2 border-dashed border-primary/20 text-center flex flex-col items-center gap-8">
                                    <div className="size-24 bg-primary/5 rounded-[32px] flex items-center justify-center text-primary/30">
                                        <span className="material-symbols-outlined text-6xl">event_upcoming</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-display text-2xl font-black text-text-n900 uppercase tracking-tight">{t('ritual.empty.title')}</h3>
                                        <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed">{t('ritual.empty.desc')}</p>
                                    </div>
                                    <button
                                        onClick={onCreate}
                                        className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
                                    >
                                        {t('ritual.btn.create_first')}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {rituals.map((ritual) => {
                                        const style = getRitualStyles(ritual.type);
                                        if (ritual.type === 'focus') {
                                            return (
                                                <article key={ritual.id} className="bg-white/40 backdrop-blur-sm rounded-[32px] p-6 border border-white/60 flex items-center justify-between opacity-80 hover:opacity-100 transition-all group shadow-sm">
                                                    <div className="flex items-center gap-6">
                                                        <div className="size-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-inner">
                                                            <span className="material-symbols-outlined text-3xl">{style.icon}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-display text-xl font-black text-text-n900 uppercase tracking-tight">{ritual.title}</h4>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{ritual.time} • Modo Silencio</p>
                                                        </div>
                                                    </div>
                                                    <span className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 italic">Auto-Ritual</span>
                                                </article>
                                            );
                                        }

                                        return (
                                            <article
                                                key={ritual.id}
                                                onClick={() => onViewDetails(ritual)}
                                                className={`group relative overflow-hidden bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-xl shadow-primary/2 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-8 items-center`}
                                            >
                                                <div className={`absolute top-0 right-0 size-48 ${style.bg} rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700`}></div>

                                                <div className="flex flex-col items-center min-w-[120px]">
                                                    <span className="font-display text-4xl font-black text-text-n900 tracking-tighter leading-none">{ritual.time.split(',')[1] || '09:00'}</span>
                                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mt-2">{ritual.time.split(',')[0] || t('ritual.section.today')}</span>
                                                </div>

                                                <div className="w-px h-16 bg-black/5 hidden md:block"></div>

                                                <div className="flex-grow space-y-3 z-10 text-center md:text-left">
                                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                                        <span className={`size-2 rounded-full ${style.color.replace('text-', 'bg-')}`}></span>
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${style.color}`}>{style.label}</span>
                                                    </div>
                                                    <h4 className="font-display text-2xl font-black text-text-n900 group-hover:text-primary transition-colors tracking-tight leading-none uppercase">{ritual.title}</h4>
                                                    <p className="text-gray-400 font-bold text-sm line-clamp-2 md:max-w-md">{ritual.desc}</p>
                                                </div>

                                                <div className="flex flex-col items-center gap-4 z-10">
                                                    <div className="flex -space-x-3">
                                                        {ritual.participants?.slice(0, 3).map((p, idx) => (
                                                            <div key={idx} className="size-10 rounded-2xl border-4 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-black text-text-n900 shadow-sm" title={p}>
                                                                {p.charAt(0)}
                                                            </div>
                                                        ))}
                                                        {(ritual.participants?.length || 0) > 3 && (
                                                            <div className="size-10 rounded-2xl border-4 border-white bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                                                +{(ritual.participants?.length || 0) - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button className="px-6 py-2 rounded-xl bg-text-n900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all">
                                                        Detalles
                                                    </button>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={onViewHistory}
                                    className="flex items-center gap-3 text-text-n900/30 hover:text-primary font-black text-[10px] uppercase tracking-[0.3em] transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">history_edu</span>
                                    {t('ritual.history.link')}
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Preparation View */}
                    {activeView === 'preparacion' && (
                        <section className="space-y-8 animate-fade-in">
                            <div className="bg-amber-400 text-white p-10 rounded-[40px] shadow-2xl shadow-amber-200/50 relative overflow-hidden group">
                                <div className="absolute top-[-20%] right-[-20%] size-48 bg-white/20 rounded-full blur-[80px]"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined text-3xl font-black">emergency_home</span>
                                        </div>
                                        <h3 className="font-display text-2xl font-black uppercase tracking-tight">{t('ritual.prep.attention')}</h3>
                                    </div>
                                    <p className="text-white/90 font-bold text-lg leading-relaxed max-w-xl">
                                        &ldquo;{t('ritual.prep.desc')}&rdquo;
                                    </p>
                                </div>
                            </div>

                            <article className="bg-white rounded-[40px] p-10 border border-black/5 shadow-2xl shadow-primary/5 flex flex-col md:flex-row gap-10 items-center relative group">
                                <div className="flex flex-col items-center min-w-[140px]">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-3">{t('ritual.prep.next')}</span>
                                    <span className="font-display text-5xl font-black text-primary leading-none tracking-tighter">09:00</span>
                                    <span className="text-sm font-black text-gray-400 mt-2 uppercase">{t('ritual.section.today')}</span>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <h4 className="font-display text-3xl font-black text-text-n900 tracking-tight leading-none uppercase">{t('ritual.card.prepare.title')}</h4>
                                    <p className="text-gray-400 font-bold leading-relaxed">{t('ritual.card.prepare.desc')}</p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-black/5">
                                            <span className="material-symbols-outlined text-sm">group</span> 4 {t('ritual.prep.participants')}
                                        </span>
                                        <span className="px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-red-100">
                                            <span className="material-symbols-outlined text-sm">priority_high</span> {t('ritual.prep.no_participants')}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={onStartPreparation}
                                    className="w-full md:w-auto bg-primary text-white p-10 md:p-12 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 flex flex-col items-center justify-center gap-3 hover:scale-[1.05] active:scale-[0.98] transition-all"
                                >
                                    <span className="material-symbols-outlined text-5xl">rocket_launch</span>
                                    {t('ritual.prep.btn')}
                                </button>
                            </article>
                        </section>
                    )}
                </div>

                {/* Sidebar Widgets */}
                <aside className="lg:col-span-4 space-y-12 h-fit mb-20 lg:mb-0">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="size-8 rounded-lg bg-p1/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined font-black">bolt</span>
                            </div>
                            <h3 className="font-display font-black text-text-n900 uppercase tracking-widest text-lg">{t('ritual.widget.energy.title')}</h3>
                        </div>

                        <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 border border-white/60 shadow-xl shadow-primary/5 space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-32 bg-primary/2 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>

                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">{t('ritual.widget.analysis')}</h4>
                                <div className="flex items-end gap-3 mb-6">
                                    <span className="font-display text-5xl font-black text-text-n900 leading-none tracking-tighter uppercase">{energyLevel}</span>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{t('ritual.widget.level')}</span>
                                </div>

                                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden mb-6">
                                    <div className={`h-full bg-gradient-to-r ${energyColor} rounded-full transition-all duration-1000`} style={{ width: ritualCount > 3 ? '85%' : '40%' }}></div>
                                </div>

                                <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                                    {ritualCount > 3
                                        ? t('ritual.widget.msg.high').replace('{count}', ritualCount.toString())
                                        : t('ritual.widget.msg.optimal')
                                    }
                                </p>
                            </div>

                            {ritualCount > 3 && (
                                <div className="bg-primary text-white rounded-[24px] p-6 shadow-2xl shadow-primary/20 space-y-3 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 size-20 bg-white/10 rounded-full blur-xl"></div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg font-black">lightbulb</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Bio-Sugerencia</span>
                                    </div>
                                    <p className="text-xs font-black leading-relaxed">{t('ritual.widget.suggestion')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 border border-white/60 shadow-xl shadow-primary/5 space-y-8">
                        <h3 className="font-display font-black text-text-n900 uppercase tracking-widest text-lg px-2">{t('ritual.widget.tools.title')}</h3>
                        <div className="space-y-4">
                            {[
                                { icon: 'timer', title: t('ritual.widget.pomodoro'), desc: t('ritual.widget.pomodoro.desc'), color: 'bg-emerald-500' },
                                { icon: 'do_not_disturb_on', title: t('ritual.widget.mute'), desc: t('ritual.widget.mute.desc'), color: 'bg-indigo-500' }
                            ].map((tool, idx) => (
                                <button key={idx} className="w-full p-6 rounded-[28px] bg-white hover:bg-gray-50 border-2 border-transparent hover:border-black/5 transition-all text-left flex items-center gap-6 group">
                                    <div className={`size-14 rounded-2xl ${tool.color} text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
                                        <span className="material-symbols-outlined text-3xl font-black">{tool.icon}</span>
                                    </div>
                                    <div>
                                        <span className="block font-black text-text-n900 uppercase tracking-tighter text-lg leading-none">{tool.title}</span>
                                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-gray-400">{tool.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-10 border border-white/60 shadow-xl shadow-primary/5 text-center space-y-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-black text-[10px] text-gray-300 uppercase tracking-[0.2em]">Octubre 2023</span>
                            <div className="flex gap-2">
                                <button className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                                <button className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-3">
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => (
                                <span key={d} className="text-[10px] font-black text-gray-300 uppercase">{d}</span>
                            ))}
                            {[...Array(31)].map((_, i) => {
                                const day = i + 1;
                                const isEvent = day === 24 || day === 15 || day === 10;
                                const isActive = day === 24;
                                return (
                                    <div key={i} className="aspect-square flex items-center justify-center relative">
                                        <span className={`size-9 flex items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : (isEvent ? 'bg-primary/5 text-primary hover:bg-primary/20' : 'text-gray-400 hover:bg-gray-100')}`}>
                                            {day}
                                        </span>
                                        {isEvent && !isActive && <span className="absolute bottom-1 size-1 bg-primary rounded-full"></span>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </PageContainer>
    );
};

export default Rituals;
