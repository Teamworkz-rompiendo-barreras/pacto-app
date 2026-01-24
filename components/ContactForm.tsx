
import React, { useState } from 'react';

interface ContactFormProps {
  onCancel: () => void;
  onSend: () => void;
  isPublic?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onCancel, onSend, isPublic = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío real
    alert(`Mensaje enviado correctamente. Gracias ${name}, te contactaremos pronto a ${email}.`);
    onSend();
  };

  return (
    <div className={`w-full max-w-3xl mx-auto animate-fade-in ${isPublic ? '' : 'py-8'}`}>
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-text-n900">Hablemos</h2>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          ¿Tienes preguntas sobre PACTO o quieres una demo personalizada para tu equipo? Estamos aquí para escucharte.
        </p>
      </div>

      <div className="bg-white border border-gray-border rounded-xl shadow-lg shadow-primary/5 overflow-hidden">
        <div className="grid md:grid-cols-5">
          
          {/* Info Lateral */}
          <div className="bg-primary text-white p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Información de Contacto</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Completa el formulario y nuestro equipo te responderá en menos de 24 horas.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-p1">mail</span>
                  <div className="text-sm">
                    <p className="font-bold opacity-60 text-xs uppercase">Email</p>
                    <a href="mailto:hola@teamworkz.co" className="hover:text-p1 transition-colors font-medium">hola@teamworkz.co</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-p1">location_on</span>
                  <div className="text-sm">
                    <p className="font-bold opacity-60 text-xs uppercase">Sede</p>
                    <p className="font-medium">Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-20 h-20 bg-p1/20 rounded-full blur-xl"></div>
          </div>

          {/* Formulario */}
          <div className="p-8 md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-text-n900">Nombre Completo</label>
                <input 
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-text-n900">Correo Electrónico</label>
                <input 
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="nombre@empresa.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-bold text-text-n900">Asunto</label>
                <select 
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                >
                  <option value="">Selecciona un asunto...</option>
                  <option value="Demo">Solicitar Demo</option>
                  <option value="Soporte">Soporte Técnico</option>
                  <option value="Partnership">Alianzas / Partners</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-bold text-text-n900">Mensaje</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
