"use client";

import React, { useState } from "react";
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListTodo, 
  Trash2, 
  SlidersHorizontal 
} from "lucide-react";

// Görev Tipi Tanımlaması
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "Düşük" | "Orta" | "Yüksek";
  status: "Yapılacak" | "İşlemde" | "Tamamlandı";
  dueDate: string;
}

export default function TasksPage() {
  // Örnek Başlangıç Verileri
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Veritabanı Optimizasyonu",
      description: "PostgreSQL sorgularının indekslenmesi ve performans iyileştirmesi.",
      priority: "Yüksek",
      status: "İşlemde",
      dueDate: "2026-07-10",
    },
    {
      id: "2",
      title: "UI/UX Tasarım Revizyonu",
      description: "Kullanıcı paneli renk paleti ve font düzenlemeleri.",
      priority: "Orta",
      status: "Yapılacak",
      dueDate: "2026-07-15",
    },
    {
      id: "3",
      title: "API Entegrasyonu",
      description: "Ödeme ağ geçidi webhook servislerinin bağlanması.",
      priority: "Düşük",
      status: "Tamamlandı",
      dueDate: "2026-07-01",
    },
  ]);

  // Form State'leri
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Orta");
  const [status, setStatus] = useState<Task["status"]>("Yapılacak");
  const [dueDate, setDueDate] = useState("");

  // Yeni Görev Ekleme Fonksiyonu
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
    };

    setTasks([newTask, ...tasks]);
    
    // Formu sıfırla
    setTitle("");
    setDescription("");
    setPriority("Orta");
    setStatus("Yapılacak");
    setDueDate("");
  };

  // Görev Durumu Güncelleme
  const handleStatusChange = (id: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  // Görev Silme
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Metrik Hesaplamaları
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === "Yapılacak").length;
  const inProgressTasks = tasks.filter(t => t.status === "İşlemde").length;
  const completedTasks = tasks.filter(t => t.status === "Tamamlandı").length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* BAŞLIK */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#53575A]/15 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#53575A]">Görev & İş Akışı Takibi</h1>
            <p className="text-[#53575A] mt-1">Projeler</p>
          </div>
        </div>

        {/* METRİK KARTLARI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#53575A]/15 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#EA0029]/10 text-[#EA0029] rounded-lg"><ListTodo size={24} /></div>
            <div>
              <p className="text-sm text-[#53575A] font-medium">Toplam Görev</p>
              <p className="text-2xl font-bold text-[#53575A]">{totalTasks}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#53575A]/15 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#EA0029]/10 text-[#EA0029] rounded-lg"><Clock size={24} /></div>
            <div>
              <p className="text-sm text-[#53575A] font-medium">Yapılacaklar</p>
              <p className="text-2xl font-bold text-[#53575A]">{todoTasks}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#53575A]/15 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#53575A]/10 text-[#53575A] rounded-lg"><SlidersHorizontal size={24} /></div>
            <div>
              <p className="text-sm text-[#53575A] font-medium">İşlemdekiler</p>
              <p className="text-2xl font-bold text-[#53575A]">{inProgressTasks}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#53575A]/15 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#53575A]/10 text-[#53575A] rounded-lg"><CheckCircle2 size={24} /></div>
            <div>
              <p className="text-sm text-[#53575A] font-medium">Tamamlananlar</p>
              <p className="text-2xl font-bold text-[#53575A]">{completedTasks}</p>
            </div>
          </div>
        </div>

        {/* ANA İÇERİK: FORM VE LİSTE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* GÖREV OLUŞTURMA FORMU */}
          <div className="bg-white p-6 rounded-xl border border-[#53575A]/15 shadow-sm lg:col-span-1 sticky top-6">
            <h2 className="text-xl font-semibold text-[#53575A] mb-4 flex items-center gap-2">
              <Plus size={20} className="text-[#EA0029]" /> Yeni Görev Oluştur
            </h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Görev Başlığı *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ön uç geliştirmesi..."
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0029] text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Görev detayları..."
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0029] text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Öncelik</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#EA0029] text-sm"
                  >
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Aşama</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Task["status"])}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#EA0029] text-sm"
                  >
                    <option value="Yapılacak">Yapılacak</option>
                    <option value="İşlemde">İşlemde</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0029] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#EA0029] hover:bg-[#C70024] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <Plus size={16} /> Görevi Listeye Ekle
              </button>
            </form>
          </div>

          {/* İŞ AKIŞI / GÖREV LİSTESİ */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#53575A]">Aktif İş Akışı</h2>
              <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium">
                {tasks.length} Görev Listeleniyor
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white border border-dashed border-[#53575A]/20 rounded-xl p-12 text-center text-[#53575A]">
                <AlertCircle className="mx-auto mb-3 text-slate-400" size={36} />
                <p className="font-medium">Henüz bir görev oluşturulmadı.</p>
                <p className="text-sm text-slate-400 mt-1">Soldaki formu kullanarak ilk görevinizi ekleyebilirsiniz.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-white border border-[#53575A]/15 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-md">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Öncelik Badge */}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                          task.priority === "Yüksek" ? "bg-red-50 text-red-700 border border-red-200" :
                          task.priority === "Orta" ? "bg-[#EA0029]/10 text-amber-700 border border-amber-200" :
                          "bg-[#EA0029]/10 text-blue-700 border border-blue-200"
                        }`}>
                          {task.priority} Öncelik
                        </span>
                        
                        {/* Tarih */}
                        <span className="text-xs text-slate-400">
                          Bitiş: {task.dueDate}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-[#53575A] tracking-tight">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-[#53575A] line-clamp-2">{task.description}</p>
                      )}
                    </div>

                    {/* Aksiyonlar ve İş Akışı Durumu */}
                    <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                      <div>
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white focus:outline-none cursor-pointer ${
                            task.status === "Tamamlandı" ? "border-emerald-200 text-emerald-700 bg-[#53575A]/10" :
                            task.status === "İşlemde" ? "border-purple-200 text-purple-700 bg-[#53575A]/10" :
                            "border-[#53575A]/20 text-slate-700"
                          }`}
                        >
                          <option value="Yapılacak">Yapılacak</option>
                          <option value="İşlemde">İşlemde</option>
                          <option value="Tamamlandı">Tamamlandı</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Görevi Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}