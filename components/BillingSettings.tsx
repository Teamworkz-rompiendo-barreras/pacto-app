
import React from 'react';

const BillingSettings: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        {/* Alert Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-500 shrink-0">warning</span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                <p className="text-sm text-amber-900 font-medium">
                    Información de Facturación incompleta. Añada sus datos fiscales para recibir facturas válidas.
                </p>
                <button className="text-sm font-bold text-amber-700 hover:text-amber-900 underline whitespace-nowrap">
                    Editar datos fiscales
                </button>
            </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2 mb-2 pb-6 border-b border-primary/10">
            <h2 className="text-4xl font-black tracking-tight text-text-n900">Suscripción y Facturación</h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl">Administra tu plan PACTO, métodos de pago e historial de facturas.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plan Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 col-span-1 md:col-span-2 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-gray-500 font-bold uppercase tracking-wide text-xs">Plan Actual</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <h2 className="text-2xl font-black text-text-n900">PACTO Business</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">Activo</span>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-2xl font-black text-text-n900">$299.00<span className="text-lg text-gray-500 font-medium"> / mes</span></p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600 bg-bg-s1/50 p-3 rounded-lg border border-bg-s1 w-fit font-medium">
                            <span className="material-symbols-outlined text-primary">event_repeat</span>
                            <span>Se renueva automáticamente el <strong>15 de Octubre, 2023</strong></span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 font-bold">
                            <span>Ciclo actual: 15 Sept - 15 Oct</span>
                            <span>20 días restantes</span>
                        </div>
                    </div>
                    <div className="pt-2 flex gap-3">
                        <button className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
                            Cambiar Plan
                        </button>
                        <button className="px-5 py-2.5 rounded-xl text-gray-500 font-bold text-sm hover:text-text-n900 hover:bg-gray-50 transition-colors">
                            Cancelar Suscripción
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between gap-6 relative">
                <div className="flex justify-between items-start">
                    <h3 className="text-gray-500 font-bold uppercase tracking-wide text-xs">Método de Pago</h3>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center py-4">
                    <div className="w-full flex justify-center">
                        <div className="w-16 h-10 bg-[#1a1f71] rounded flex items-center justify-center text-white font-bold italic shadow-sm overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtCdZuCP2oYdGn0OFt2Fy0nwKYvzzBvOj8A-cGE4ckJKNpdwdnbuVziFpvUxHXop3lXuWcEPxMTHWUE8saWUXh5W0KZb_l-rRNa-LDUTIP8AoEbXkNcVBBBIIAXSyCgHjAYJzLDjCFWCNE5UkXzthxnqxx90KMpmmiPUlvlaTg-oIKYI-gsgL0JsFK3iDawuO8Sr5RVh5xWPjjkCXOiHwQuEwJI_7Y3vS0zI5d_gl1tNSGPplKoh3xgVSqlISIyDXknHn_KMsy64w" alt="Visa" className="h-full w-auto object-contain" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-mono text-text-n900 tracking-widest font-bold">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Expira 12/25</p>
                    </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                    <span>Actualizar Tarjeta</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>

            {/* Tax Info Card */}
            <div className="bg-[#2d3a5e] rounded-2xl p-6 md:p-8 shadow-sm md:col-span-3 lg:col-span-1 text-white relative overflow-hidden flex flex-col justify-between gap-4">
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'}}></div>
                 <div className="relative z-10">
                    <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-white">domain</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">Datos Fiscales</h3>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">Mantén tu información actualizada para la generación correcta de facturas.</p>
                 </div>
                 <button className="self-start text-sm font-bold border-b border-white/30 pb-0.5 hover:border-white transition-colors flex items-center gap-1 relative z-10">
                    Gestionar Datos <span className="material-symbols-outlined text-base">arrow_outward</span>
                 </button>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden flex flex-col">
                <div className="p-6 md:px-8 md:pt-8 md:pb-4 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-text-n900">Historial de Facturas</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                            <input className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-full md:w-48 placeholder:text-gray-400 outline-none" placeholder="Buscar..." type="text"/>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 bg-gray-50/50">
                                <th className="px-6 md:px-8 py-4 font-bold">Fecha</th>
                                <th className="px-6 md:px-8 py-4 font-bold">Concepto</th>
                                <th className="px-6 md:px-8 py-4 font-bold">Estado</th>
                                <th className="px-6 md:px-8 py-4 font-bold text-right">Monto</th>
                                <th className="px-6 md:px-8 py-4 font-bold text-center">Descarga</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {[
                                { date: '15 Sep 2023', item: 'PACTO Business - Mensual', amount: '$299.00' },
                                { date: '15 Ago 2023', item: 'PACTO Business - Mensual', amount: '$299.00' },
                                { date: '15 Jul 2023', item: 'PACTO Business - Mensual', amount: '$299.00' },
                                { date: '15 Jun 2023', item: 'PACTO Business - Mensual', amount: '$299.00' },
                            ].map((row, idx) => (
                                <tr key={idx} className="group hover:bg-bg-s1/30 transition-colors">
                                    <td className="px-6 md:px-8 py-4 text-text-n900 font-bold whitespace-nowrap">{row.date}</td>
                                    <td className="px-6 md:px-8 py-4 text-gray-600 whitespace-nowrap font-medium">{row.item}</td>
                                    <td className="px-6 md:px-8 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Pagado
                                        </span>
                                    </td>
                                    <td className="px-6 md:px-8 py-4 text-right text-text-n900 font-mono font-bold whitespace-nowrap">{row.amount}</td>
                                    <td className="px-6 md:px-8 py-4 text-center whitespace-nowrap">
                                        <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                                            <span className="material-symbols-outlined text-xl">download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-center">
                    <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                         Ver todas las facturas <span className="material-symbols-outlined text-lg">expand_more</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
export default BillingSettings;
