
import React, { useState, useEffect } from 'react';
import { reportService, MonthlyKPI } from '../services/reportService';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface MonthlyReportProps {
  onNavigateToWeekly?: () => void;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ onNavigateToWeekly }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [kpis, setKpis] = useState<MonthlyKPI[]>([]);
  const [trendData, setTrendData] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await reportService.getMonthlyMetrics('current-user');
      setKpis(data.kpis as any);
      setTrendData(data.psychologicalSafetyTrend);
      setRecommendations(data.recommendations);
    };
    loadData();
  }, []);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Reporte descargado correctamente en tu dispositivo.");
    }, 2000);
  };

  return (
    <PageContainer>
      <PageHeader
        title={
          <span>
            Reporte Mensual <span className="text-primary/60">—</span> Octubre 2023
          </span>
        }
        subtitle="Visualización de métricas críticas para la seguridad psicológica y claridad de procesos del equipo."
        badge={
          <>
            <span className="material-symbols-outlined text-sm">analytics</span>
            Reporte Mensual
          </>
        }
        actionButton={
          <div className="flex flex-col sm:flex-row gap-3">
            {onNavigateToWeekly && (
              <button
                onClick={onNavigateToWeekly}
                className="flex items-center justify-center gap-2 bg-white border border-primary/20 text-primary hover:bg-primary/5 px-6 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">calendar_view_week</span>
                <span>Ver Semana Actual</span>
              </button>
            )}
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
            >
              {isExporting ? (
                <span className="material-symbols-outlined text-xl animate-spin">refresh</span>
              ) : (
                <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
              )}
              <span>{isExporting ? 'Generando...' : 'Exportar PDF'}</span>
            </button>
          </div>
        }
      />

      {/* Stats Grid (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white p-6 rounded-xl border border-gray-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className={`material-symbols-outlined ${kpi.color.replace('text-', 'bg-')}/10 ${kpi.color} p-2 rounded-lg`}>{kpi.icon}</span>
              <span className={`${kpi.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'} text-sm font-bold flex items-center gap-1`}>
                {kpi.trend > 0 ? '+' : ''}{kpi.trend}% <span className="material-symbols-outlined text-xs">{kpi.trendDirection === 'up' ? 'trending_up' : 'trending_down'}</span>
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">{kpi.label}</p>
              <p className="text-3xl font-black text-text-n900">{kpi.value}</p>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className={`h-full rounded-full ${kpi.color.replace('text-', 'bg-')}`} style={{ width: typeof kpi.value === 'string' && kpi.value.includes('%') ? kpi.value : '70%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: Evolución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl border border-gray-border shadow-sm h-full flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-text-n900 tracking-tight">Evolución de la Seguridad Psicológica</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Tendencia de los últimos 6 meses basada en pulsos semanales.</p>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4 min-h-[250px]">
              {['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'].map((month, idx) => {
                const val = trendData[idx] || 0;
                return (
                  <div key={month} className="flex flex-col items-center gap-3 w-full group" role="group" aria-label={`Datos de ${month}`}>
                    <div className="text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">{val}%</div>
                    <div
                      className={`w-full rounded-t-lg relative transition-all ${idx === 5 ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-primary/20 group-hover:bg-primary/30'}`}
                      style={{ height: `${val}%` }}
                      role="img"
                      aria-label={`Nivel de seguridad psicológica: ${val}%`}
                    ></div>
                    <span className={`text-sm font-bold ${idx === 5 ? 'text-primary font-black' : 'text-gray-600'}`} aria-hidden="true">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border-2 border-primary/10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary animate-pulse">lightbulb</span>
              <h2 className="text-xl font-black text-text-n900 tracking-tight">Recomendaciones</h2>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] custom-scrollbar pr-2">
              <div className="p-4 bg-white rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-primary mb-1 uppercase tracking-tighter">Fatiga Cognitiva</p>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">Considerar ajustar el acuerdo de reuniones para reducir la fatiga cognitiva: implementar bloques de "foco total".</p>
              </div>
              <div className="p-4 bg-white rounded-xl border-l-4 border-p1 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-yellow-700 mb-1 uppercase tracking-tighter">Claridad de Roles</p>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">Detectada ambigüedad en la asignación de tareas del Equipo A. Sugerimos revisar procesos asincrónicos.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border-l-4 border-secondary-s3 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-secondary-s3 mb-1 uppercase tracking-tighter">Bienestar</p>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">Alta participación en rituales pero descenso en satisfacción. Programar sesión de feedback.</p>
              </div>

              {showAllSuggestions && (
                <>
                  <div className="p-4 bg-white rounded-xl border-l-4 border-gray-400 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
                    <p className="text-sm font-bold text-gray-600 mb-1 uppercase tracking-tighter">Comunicación</p>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">Los canales de Slack de 'Urgencia' están siendo usados para temas no urgentes. Reforzar el acuerdo de comunicación.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow animate-fade-in">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-tighter">Onboarding</p>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">Crear un manual de usuario personal para los 2 nuevos integrantes.</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowAllSuggestions(!showAllSuggestions)}
              className="w-full mt-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
            >
              {showAllSuggestions ? 'Ver menos sugerencias' : 'Ver todas las sugerencias'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-bold">
        <p>© 2026 PACTO by Teamworkz. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors cursor-pointer">Política de Privacidad</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Términos de Servicio</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Soporte</a>
        </div>
      </footer>
    </PageContainer>
  );
};

export default MonthlyReport;
