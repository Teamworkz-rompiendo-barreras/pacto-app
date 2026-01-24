
import React, { useState, useRef } from 'react';

interface FeedbackProps {
  onSave: () => void;
  onCancel: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ onSave, onCancel }) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [wantsResponse, setWantsResponse] = useState(true);
  const [fileName, setFileName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !type) {
      alert('Por favor, selecciona un tipo de comentario y escribe un mensaje.');
      return;
    }

    setIsSubmitting(true);

    // Simular envío de datos a un endpoint de API
    // Aquí iría la lógica real: await fetch('/api/feedback', { method: 'POST', body: ... })
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Esperar a que el usuario lea el mensaje antes de cerrar
    setTimeout(() => {
      onSave();
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in relative">
      <header className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">¿Cómo podemos mejorar PACTO?</h2>
        <p className="text-xl opacity-70 max-w-xl mx-auto">
          Ayúdanos a evolucionar la plataforma para que sea el mejor lugar para el talento neurodivergente.
        </p>
      </header>

      <section className="bg-pacto-bg border border-pacto-border rounded-pacto p-8 md:p-10 shadow-sm space-y-8">
        {/* Alerta de apoyo */}
        <div className="p-5 rounded-lg bg-pacto-secondary/10 border border-pacto-secondary/20 flex items-start gap-4">
          <div className="text-pacto-primary shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-pacto-primary leading-tight">¡Tu opinión cuenta!</p>
            <p className="text-sm opacity-80 mt-1">
              Gracias por ayudarnos a construir una herramienta más inclusiva. Tu opinión es fundamental para que el equipo de PACTO siga mejorando día a día.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="feedback-type" className="block font-bold">Tipo de comentario</label>
              <select 
                id="feedback-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 border-2 border-pacto-border rounded-pacto focus:border-pacto-primary outline-none bg-white cursor-pointer"
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Error Técnico">Error técnico</option>
                <option value="Sugerencia">Sugerencia de mejora</option>
                <option value="Accesibilidad">Accesibilidad</option>
                <option value="Felicitación">Felicitación</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-bold">Adjuntar captura (Opcional)</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,.pdf"
                disabled={isSubmitting}
              />
              <button 
                type="button"
                onClick={handleFileClick}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-pacto transition-all ${fileName ? 'border-pacto-primary bg-pacto-primary/5 text-pacto-primary' : 'border-pacto-border bg-white/50 hover:bg-white hover:border-pacto-primary text-pacto-text/60'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {fileName ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-bold truncate">{fileName}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    <span className="font-medium">Subir archivo o imagen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block font-bold">Tu mensaje</label>
            <textarea 
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              className="w-full p-4 border-2 border-pacto-border rounded-pacto focus:border-pacto-primary outline-none resize-none disabled:opacity-50"
              placeholder="Describe tu experiencia, el problema encontrado o tu idea de mejora con el mayor detalle posible..."
              aria-required="true"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-pacto-primary/5 border border-pacto-primary/10">
            <div>
              <p className="font-bold">Deseo recibir una respuesta</p>
              <p className="text-sm opacity-60">Te contactaremos por email si necesitamos más detalles.</p>
            </div>
            <button 
              type="button"
              role="switch"
              aria-checked={wantsResponse}
              disabled={isSubmitting}
              onClick={() => setWantsResponse(!wantsResponse)}
              className={`w-14 h-8 rounded-full transition-colors relative ${wantsResponse ? 'bg-pacto-primary' : 'bg-gray-300'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Toggle recibir respuesta"
            >
              <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${wantsResponse ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
            <button 
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 rounded-pacto bg-pacto-primary text-white font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  Enviar a Teamworkz
                </>
              )}
            </button>
          </div>
        </form>
      </section>
      
      {/* Notificación de éxito */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-text-n900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-bounce-in max-w-sm w-full">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <div>
            <p className="font-bold text-lg">¡Feedback Enviado!</p>
            <p className="text-sm opacity-80 leading-tight">Hemos recibido tus comentarios correctamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
