
import React, { useState } from 'react';

interface BulkUploadProps {
  onBack: () => void;
  onComplete: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ onBack, onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleProcess = () => {
    if (!file) return;
    setIsProcessing(true);
    // Simular procesamiento
    setTimeout(() => {
        setIsProcessing(false);
        onComplete();
    }, 2000);
  };

  return (
    <div className="w-full h-full animate-fade-in font-display bg-bg-s1">
      <div className="max-w-[960px] mx-auto flex flex-col gap-8 pb-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
                <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                    <button onClick={onBack} className="hover:text-primary transition-colors">Equipos</button>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-primary font-bold">Importar Miembros</span>
                </nav>
                <h1 className="text-3xl md:text-4xl font-black text-text-n900 tracking-tight leading-tight">
                    Carga Masiva de Usuarios
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl font-medium">
                    Importe nuevos miembros al equipo de forma rápida y segura utilizando archivos CSV o Excel.
                </p>
            </div>
            <div className="shrink-0">
                <button className="inline-flex items-center gap-2 text-primary font-bold text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-primary/10 hover:bg-primary/5 transition-colors group">
                    <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform text-lg">download</span>
                    Descargar Plantilla
                </button>
            </div>
        </div>

        {/* Accessibility Tip */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 shadow-sm flex gap-4 items-start">
            <div className="bg-white p-2 rounded-full text-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined">accessibility_new</span>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-primary font-bold text-base flex items-center gap-2">
                    Tip de Accesibilidad
                </p>
                <p className="text-text-n900/80 text-sm leading-relaxed max-w-3xl font-medium">
                    Verifique que los correos electrónicos sean correctos antes de subir el archivo. Los errores en el inicio de sesión pueden generar <strong className="text-text-n900">ansiedad innecesaria</strong> en los nuevos usuarios neurodivergentes al intentar acceder por primera vez.
                </p>
            </div>
        </div>

        {/* Upload Area */}
        <section className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-white/50">
            <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-primary/30 rounded-xl bg-bg-s1/30 hover:bg-primary/5 hover:border-primary transition-all duration-300 group cursor-pointer gap-6"
            >
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/80 text-gray-500 rounded border border-black/5 shadow-sm">.CSV</span>
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/80 text-gray-500 rounded border border-black/5 shadow-sm">.XLSX</span>
                </div>
                
                <div className="size-20 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
                </div>
                
                <div className="text-center px-4 max-w-md space-y-2">
                    {file ? (
                        <>
                            <p className="text-xl font-bold text-primary">{file.name}</p>
                            <p className="text-gray-500 text-sm font-medium">{(file.size / 1024).toFixed(2)} KB • Listo para procesar</p>
                        </>
                    ) : (
                        <>
                            <p className="text-xl font-bold text-text-n900">Arrastra y suelta tu archivo aquí</p>
                            <p className="text-gray-500 text-sm font-medium">
                                Soporta archivos de Excel y CSV hasta 10MB.
                            </p>
                        </>
                    )}
                </div>

                <div className="relative">
                    <button className="bg-primary hover:brightness-110 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2 pointer-events-none">
                        <span className="material-symbols-outlined text-sm">folder_open</span>
                        {file ? 'Cambiar Archivo' : 'Seleccionar Archivo'}
                    </button>
                    <input 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        type="file" 
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </section>

        {/* Validation Preview (Solo visible si hay archivo o para demo) */}
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-text-n900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-500">fact_check</span>
                    Validación en Tiempo Real
                </h2>
                <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm">Vista Previa: 3 de 45 filas</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-white/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-bg-s1/50 border-b border-black/5">
                            <tr>
                                <th className="px-6 py-4 font-bold text-text-n900 w-[30%]" scope="col">Nombre Completo</th>
                                <th className="px-6 py-4 font-bold text-text-n900 w-[30%]" scope="col">Correo Electrónico</th>
                                <th className="px-6 py-4 font-bold text-text-n900 w-[20%]" scope="col">Rol Asignado</th>
                                <th className="px-6 py-4 font-bold text-text-n900 w-[20%] text-right" scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {/* Row 1: Success */}
                            <tr className="hover:bg-bg-s1/20 transition-colors">
                                <td className="px-6 py-4 font-bold text-text-n900 flex items-center gap-3">
                                    <div aria-hidden="true" className="size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs border border-orange-200">AG</div>
                                    Ana García
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">ana.garcia@empresa.com</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                        Admin
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                        <span className="material-symbols-outlined text-[16px] leading-none font-bold">check_circle</span>
                                        Listo
                                    </span>
                                </td>
                            </tr>
                            {/* Row 2: Error */}
                            <tr className="bg-red-50/50 hover:bg-red-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-text-n900 flex items-center gap-3">
                                    <div aria-hidden="true" className="size-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs border border-purple-200">CR</div>
                                    Carlos Ruiz
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-red-600 line-through decoration-red-400 font-bold">carlos.ruiz..@empresa</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
                                        Editor
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                                        <span className="material-symbols-outlined text-[16px] leading-none font-bold">error</span>
                                        Email Inválido
                                    </span>
                                </td>
                            </tr>
                            {/* Row 3: Success */}
                            <tr className="hover:bg-bg-s1/20 transition-colors">
                                <td className="px-6 py-4 font-bold text-text-n900 flex items-center gap-3">
                                    <div aria-hidden="true" className="size-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs border border-teal-200">LM</div>
                                    Lucia Mendez
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">lucia.mendez@empresa.com</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
                                        Viewer
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                        <span className="material-symbols-outlined text-[16px] leading-none font-bold">check_circle</span>
                                        Listo
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-3 bg-bg-s1/30 border-t border-black/5 flex items-center justify-center">
                    <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1 transition-all">
                        Ver todos los registros
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                </div>
            </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4 border-t border-black/5">
            <button 
                onClick={onBack}
                disabled={isProcessing}
                className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:text-text-n900 hover:bg-black/5 transition-colors disabled:opacity-50"
            >
                Cancelar
            </button>
            <button 
                onClick={handleProcess}
                disabled={isProcessing}
                className="px-8 py-3 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/25 hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
            >
                {isProcessing ? (
                    <>
                        <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                        Procesando...
                    </>
                ) : (
                    <>
                        Procesar Importación
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default BulkUpload;
