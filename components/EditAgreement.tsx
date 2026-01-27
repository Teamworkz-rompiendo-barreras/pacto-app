import React from 'react';
import { Agreement } from '../types';
import AgreementForm from './AgreementForm';

interface EditAgreementProps {
    onBack: () => void;
    onSave: (data: Partial<Agreement>) => void;
    onArchive?: () => void;
    initialData?: Agreement | null;
}

const EditAgreement: React.FC<EditAgreementProps> = ({ onBack, onSave, onArchive, initialData }) => {
    // Si no hay datos iniciales, mostramos un estado vacío/informativo
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

    // Wrapper para adaptar onSave de AgreementForm a EditAgreement
    const handleSave = (data: Partial<Agreement>) => {
        // Combinamos los datos nuevos con los existentes para asegurar que no perdemos ID u otros campos
        onSave({
            ...initialData,
            ...data
        });
    };

    return (
        <div className="w-full">
            {/* Header simplificado */}
            <div className="max-w-2xl mx-auto pt-8 px-4 mb-[-20px] relative z-10 flex justify-between items-center">
                <button onClick={onBack} className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Volver
                </button>

                {onArchive && (
                    <button
                        onClick={onArchive}
                        className="text-red-500 hover:text-red-700 font-bold text-xs flex items-center gap-1 px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">archive</span>
                        ARCHIVAR ACUERDO
                    </button>
                )}
            </div>

            <AgreementForm
                initialData={initialData}
                onSave={handleSave}
                onCancel={onBack}
            />
        </div>
    );
};

export default EditAgreement;
