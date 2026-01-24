
import React, { useState, useEffect } from 'react';
import { Agreement } from '../types';

interface EditAgreementProps {
  onBack: () => void;
  onSave: () => void;
  initialData?: Agreement | null;
}

const EditAgreement: React.FC<EditAgreementProps> = ({ onBack, onSave, initialData }) => {
  // Si no hay datos iniciales, mostramos un estado vacío/informativo en lugar del formulario
  if (!initialData) {
      return (
          <div className="max-w-[1200px] mx-auto px-4 py-20 font-sans text-[#131216] flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="size-24 bg-[#F0E8D1] rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-5xl text-[#4b37a4]">edit_off</span>
              </div>
              <h2 className="text-3xl font-black text-[#131216] mb-4">No has seleccionado ningún acuerdo</h2>
              <p className="text-lg text-[#6e6a81] max-w-lg mb-8">
                  Para editar, por favor ve al Dashboard y selecciona el icono de lápiz <span className="material-symbols-outlined align-middle text-sm">edit</span> en la tarjeta del acuerdo que deseas modificar.
              </p>
              <button 
                  onClick={onBack}
                  className="bg-[#4b37a4] text-white px-8 py-3 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-[#4b37a4]/20 transition-all active:scale-95 flex items-center gap-2"
              >
                  <span className="material-symbols-outlined">dashboard</span>
                  Ir al Dashboard
              </button>
          </div>
      );
  }

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [rules, setRules] = useState<string[]>(initialData.rules && initialData.rules.length > 0 ? initialData.rules : ["Norma 1..."]);
  const [participants, setParticipants] = useState<string[]>(initialData.participants && initialData.participants.length > 0 ? initialData.participants : ["Todo el Equipo"]);

  // Handlers para Normas
  const handleAddRule = () => {
    setRules([...rules, "Nueva norma..."]);
  };

  const handleUpdateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Handlers para Participantes
  const handleAddParticipant = () => {
    const availableRoles = ["Ingeniería", "Producto", "Marketing", "RRHH", "QA"];
    const nextRole = availableRoles.find(r => !participants.includes(r)) || "Consultores";
    if (!participants.includes(nextRole)) {
        setParticipants([...participants, nextRole]);
    }
  };

  const handleRemoveParticipant = (name: string) => {
    setParticipants(participants.filter(p => p !== name));
  };

  // Handlers de Acción
  const handleSave = () => {
    const btn = document.getElementById('save-btn');
    if (btn) {
        const originalText = btn.innerText;
        btn.innerText = 'Guardando...';
        setTimeout(() => {
            btn.innerText = originalText;
            onSave();
        }, 800);
    } else {
        onSave();
    }
  };

  const handleDelete = () => {
      if (window.confirm("¿Estás seguro de que quieres eliminar este acuerdo? Esta acción no se puede deshacer.")) {
          onBack();
      }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans text-[#131216]">
        {/* Breadcrumbs & Heading */}
        <div className="flex flex-col gap-2 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 text-[#6e6a81] text-sm">
                <button onClick={onBack} className="hover:text-[#4b37a4] flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-sm">home</span>
                    Acuerdos
                </button>
                <span>/</span>
                <span className="text-[#131216] font-medium">Editar Acuerdo</span>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-[#131216] text-4xl font-black leading-tight tracking-tight font-display">
                    Editar: {title}
                </h1>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 cursor-pointer rounded-lg h-10 px-4 bg-white border border-[#dedde3] text-[#131216] text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Cancelar</span>
                </button>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
            
            {/* Form Section */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-white">
                    <div className="p-8 flex flex-col gap-8">
                        
                        {/* Nombre Section */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#131216] text-lg font-bold leading-normal font-display">Nombre del Acuerdo</label>
                            <input 
                                className="w-full rounded-lg border border-[#dedde3] bg-white focus:ring-2 focus:ring-[#4b37a4] focus:border-[#4b37a4] h-14 px-4 text-base outline-none transition-all" 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Descripción Section */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#131216] text-lg font-bold leading-normal font-display">Descripción Clara</label>
                            <p className="text-sm text-[#6e6a81] -mt-1 mb-1">Edita el propósito para mantenerlo actualizado.</p>
                            <textarea 
                                className="w-full rounded-lg border border-[#dedde3] bg-white focus:ring-2 focus:ring-[#4b37a4] focus:border-[#4b37a4] min-h-[120px] p-4 text-base leading-relaxed outline-none transition-all resize-y"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Normas Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[#131216] text-lg font-bold font-display">Normas de Colaboración</label>
                                <button 
                                    onClick={handleAddRule}
                                    className="text-[#4b37a4] text-sm font-bold flex items-center gap-1 hover:underline transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">add_circle</span>
                                    Añadir norma
                                </button>
                            </div>
                            <div className="flex flex-col gap-3">
                                {rules.map((rule, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#F0E8D1]/30 rounded-lg border border-dashed border-[#dedde3] group transition-colors hover:border-[#4b37a4]/30 hover:bg-white">
                                        <span className="material-symbols-outlined text-[#6e6a81] cursor-grab active:cursor-grabbing">drag_indicator</span>
                                        <input 
                                            className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base text-[#131216] outline-none" 
                                            type="text" 
                                            value={rule}
                                            onChange={(e) => handleUpdateRule(idx, e.target.value)}
                                        />
                                        <button 
                                            onClick={() => handleRemoveRule(idx)}
                                            className="text-[#6e6a81] hover:text-[#B91C1C] opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Eliminar norma"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Participantes Section */}
                        <div className="flex flex-col gap-4">
                            <label className="text-[#131216] text-lg font-bold font-display">Participantes Afectados</label>
                            <div className="flex flex-wrap gap-2">
                                {participants.map((participant) => (
                                    <span key={participant} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4b37a4]/10 text-[#4b37a4] rounded-full text-sm font-bold border border-[#4b37a4]/20 animate-fade-in">
                                        {participant}
                                        <button onClick={() => handleRemoveParticipant(participant)} className="hover:text-[#B91C1C] transition-colors flex items-center">
                                            <span className="material-symbols-outlined text-xs">close</span>
                                        </button>
                                    </span>
                                ))}
                                
                                <button 
                                    onClick={handleAddParticipant}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium border border-[#dedde3] hover:bg-gray-200 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xs">add</span>
                                    Etiquetar rol
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-8 bg-gray-50 border-t border-[#dedde3] flex flex-wrap items-center justify-between gap-4">
                        <button 
                            onClick={handleDelete}
                            className="bg-[#B91C1C]/10 text-[#B91C1C] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#B91C1C]/20 transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">delete_forever</span>
                            Eliminar Acuerdo
                        </button>
                        <div className="flex gap-4">
                            <button 
                                onClick={onBack}
                                className="text-[#6e6a81] hover:text-[#131216] text-sm font-bold px-6 py-2.5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                id="save-btn"
                                onClick={handleSave}
                                className="bg-[#4b37a4] text-white text-sm font-bold px-8 py-2.5 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accessibility Sidebar */}
            <aside className="flex flex-col gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-white sticky top-24">
                    <h3 className="text-[#131216] text-lg font-black mb-6 flex items-center gap-2 font-display">
                        <span className="material-symbols-outlined text-[#4b37a4]">visibility</span>
                        Accesibilidad
                    </h3>
                    <div className="space-y-6">
                        {/* Feedback Item 1 */}
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-[#28A745]">check_circle</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-[#131216]">Lenguaje claro y directo</p>
                                <p className="text-xs text-[#6e6a81] leading-relaxed">No se han detectado metáforas complejas o lenguaje ambiguo.</p>
                            </div>
                        </div>
                        {/* Feedback Item 2 */}
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-[#28A745]">check_circle</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-[#131216]">Estructura lógica detectada</p>
                                <p className="text-xs text-[#6e6a81] leading-relaxed">Las normas están numeradas o divididas en puntos de lectura fácil.</p>
                            </div>
                        </div>
                        {/* Feedback Item 3 */}
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-[#4b37a4]/40">info</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-[#131216]">Contraste de color óptimo</p>
                                <p className="text-xs text-[#6e6a81] leading-relaxed">Los elementos visuales cumplen con el estándar WCAG AA.</p>
                            </div>
                        </div>
                        
                        {/* Analysis Chart Placeholder */}
                        <div className="mt-4 pt-6 border-t border-gray-100">
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#4b37a4] w-[85%] rounded-full"></div>
                            </div>
                            <p className="text-xs font-bold text-center mt-3 text-[#4b37a4] uppercase tracking-widest">Puntuación PACTO: 85/100</p>
                        </div>
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-[#4b37a4]/5 rounded-xl p-5 border border-[#4b37a4]/10">
                    <p className="text-xs font-bold text-[#4b37a4] uppercase mb-2">Consejo Teamworkz</p>
                    <p className="text-sm text-[#4b37a4]/80 leading-relaxed">
                        Intenta que cada norma sea una acción concreta. Por ejemplo: "Silenciar micros" es mejor que "Sea respetuoso".
                    </p>
                </div>
            </aside>
        </div>
    </div>
  );
};

export default EditAgreement;
