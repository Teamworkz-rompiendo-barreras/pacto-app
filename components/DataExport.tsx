
import React, { useState } from 'react';

interface DataExportProps {
}

const DataExport: React.FC<DataExportProps> = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
    const [selectedData, setSelectedData] = useState({
        agreements: true,
        metrics: true,
        rituals: false
    });

    const handleToggleData = (key: keyof typeof selectedData) => {
        setSelectedData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleExport = () => {
        setIsProcessing(true);
        // Simular generación de archivo
        setTimeout(() => {
            setIsProcessing(false);
            alert(`Archivo ${format.toUpperCase()} generado correctamente. La descarga comenzará en breve.`);
        }, 2000);
    };

    return (
        <div className="w-full h-full animate-fade-in font-display bg-bg-s1 min-h-screen flex flex-col">
            {/* Header */}
            {/* Header Removed - Handled by Layout */}


            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 w-full">
                {/* Card Container */}
                <div className="w-full max-w-[800px] bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col animate-slide-up">

                    {/* Card Header */}
                    <div className="p-8 pb-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <span className="material-symbols-outlined text-3xl">folder_zip</span>
                                </div>
                                <p className="text-text-n900 text-3xl font-black leading-tight tracking-tight">Exportación de Datos</p>
                            </div>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-2xl">
                                Configure los parámetros para generar su reporte de actividad del equipo. Seleccione los datos requeridos y el formato deseado.
                            </p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8 space-y-10">

                        {/* Section 1: Data Selection */}
                        <section>
                            <h3 className="text-text-n900 text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">checklist</span>
                                Seleccionar Datos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md ${selectedData.agreements ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/30'}`}>
                                    <input
                                        checked={selectedData.agreements}
                                        onChange={() => handleToggleData('agreements')}
                                        className="peer h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        type="checkbox"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-text-n900 font-bold">Acuerdos</span>
                                        <span className="text-xs text-gray-500 font-medium">Metas y compromisos</span>
                                    </div>
                                    <span className={`material-symbols-outlined absolute top-4 right-4 text-primary transition-opacity ${selectedData.agreements ? 'opacity-100' : 'opacity-0'}`}>check_circle</span>
                                </label>

                                <label className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md ${selectedData.metrics ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/30'}`}>
                                    <input
                                        checked={selectedData.metrics}
                                        onChange={() => handleToggleData('metrics')}
                                        className="peer h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        type="checkbox"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-text-n900 font-bold">Métricas</span>
                                        <span className="text-xs text-gray-500 font-medium">Datos de inclusión</span>
                                    </div>
                                    <span className={`material-symbols-outlined absolute top-4 right-4 text-primary transition-opacity ${selectedData.metrics ? 'opacity-100' : 'opacity-0'}`}>check_circle</span>
                                </label>

                                <label className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md ${selectedData.rituals ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/30'}`}>
                                    <input
                                        checked={selectedData.rituals}
                                        onChange={() => handleToggleData('rituals')}
                                        className="peer h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        type="checkbox"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-text-n900 font-bold">Rituales</span>
                                        <span className="text-xs text-gray-500 font-medium">Historial de eventos</span>
                                    </div>
                                    <span className={`material-symbols-outlined absolute top-4 right-4 text-primary transition-opacity ${selectedData.rituals ? 'opacity-100' : 'opacity-0'}`}>check_circle</span>
                                </label>
                            </div>
                        </section>

                        {/* Section 2: Date Range */}
                        <section>
                            <h3 className="text-text-n900 text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">date_range</span>
                                Rango de Fechas
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-sm font-bold text-gray-600 pl-1">Fecha de inicio</span>
                                    <div className="relative">
                                        <input className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-11 text-text-n900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" type="date" />
                                        <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">calendar_today</span>
                                    </div>
                                </label>
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-sm font-bold text-gray-600 pl-1">Fecha de fin</span>
                                    <div className="relative">
                                        <input className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-11 text-text-n900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" type="date" />
                                        <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">event</span>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* Section 3: Format */}
                        <section>
                            <h3 className="text-text-n900 text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">save_as</span>
                                Formato de Archivo
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { id: 'csv', label: 'CSV', sub: 'Valores separados', icon: 'description' },
                                    { id: 'excel', label: 'Excel', sub: 'Hoja de cálculo', icon: 'table_view' },
                                    { id: 'pdf', label: 'PDF Accesible', sub: 'Documento portátil', icon: 'picture_as_pdf' }
                                ].map((fmt) => (
                                    <label key={fmt.id} className="flex-1 min-w-[140px] cursor-pointer relative group">
                                        <input
                                            checked={format === fmt.id}
                                            onChange={() => setFormat(fmt.id as any)}
                                            name="format"
                                            type="radio"
                                            className="peer sr-only"
                                        />
                                        <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-4 flex flex-col items-center justify-center gap-2 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-1 peer-checked:ring-primary group-hover:border-primary/30 group-hover:shadow-md">
                                            <span className={`material-symbols-outlined text-3xl transition-colors ${format === fmt.id ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>{fmt.icon}</span>
                                            <span className="text-sm font-bold text-text-n900">{fmt.label}</span>
                                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{fmt.sub}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Privacy Notice */}
                        <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 flex gap-4 items-start">
                            <div className="p-2 bg-blue-100 rounded-lg shrink-0 text-blue-600">
                                <span className="material-symbols-outlined">shield_lock</span>
                            </div>
                            <div>
                                <h4 className="text-blue-900 text-sm font-bold mb-1">Aviso de Privacidad</h4>
                                <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                                    Los datos exportados contienen información sensible. Asegúrese de manejarlos cumpliendo con el <span className="font-bold">RGPD</span> y las políticas de privacidad internas para proteger a los miembros del equipo.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                onClick={handleExport}
                                disabled={isProcessing}
                                className="w-full h-14 rounded-xl bg-primary hover:brightness-110 text-white text-lg font-bold tracking-wide transition-all transform active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-wait"
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                        Generando archivo...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">download</span>
                                        Generar y Descargar Archivo
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DataExport;
