import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, RefreshCw, LogOut, AlertTriangle, Calendar, Clock, User, Phone, Scissors, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Booking = {
  id: string;
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_phone: string;
  service: string;
  created_at: string;
};

const ADMIN_PASSWORD = "admin123";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });
    setBookings((data as Booking[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) loadBookings();
  }, [authed]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const removeBooking = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setConfirmDeleteId(null);
  };

  const clearAll = async () => {
    const ids = bookings.map((b) => b.id);
    if (ids.length > 0) {
      await supabase.from("bookings").delete().in("id", ids);
    }
    setBookings([]);
    setConfirmClearAll(false);
  };

  const filtered = bookings.filter(
    (b) =>
      b.client_name.toLowerCase().includes(search.toLowerCase()) ||
      b.client_phone.includes(search) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.booking_date.includes(search)
  );

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card rounded-sm p-10 w-full max-w-sm text-center space-y-6"
        >
          <div className="w-16 h-16 mx-auto rounded-full gold-gradient flex items-center justify-center">
            <Scissors className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold gold-text">Painel Admin</h1>
          <p className="text-sm text-muted-foreground font-body">Digite a senha de administrador</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Senha"
            className="w-full bg-input border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground text-center focus:outline-none focus:border-primary transition-colors"
          />
          {pwError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm font-body flex items-center justify-center gap-1"
            >
              <AlertTriangle className="w-4 h-4" /> Senha incorreta
            </motion.p>
          )}
          <button
            onClick={handleLogin}
            className="w-full gold-gradient text-primary-foreground px-8 py-3 rounded-sm text-sm font-body font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-xl font-display font-bold gold-text">Barbosa's Barber</h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="text-muted-foreground hover:text-foreground text-sm font-body flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card rounded-sm p-5 text-center">
            <p className="text-3xl font-display font-bold gold-text">{bookings.length}</p>
            <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Total</p>
          </div>
          <div className="glass-card rounded-sm p-5 text-center">
            <p className="text-3xl font-display font-bold text-foreground">
              {bookings.filter(b => b.booking_date >= new Date().toISOString().split("T")[0]).length}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Próximos</p>
          </div>
          <div className="glass-card rounded-sm p-5 text-center col-span-2 md:col-span-1">
            <p className="text-3xl font-display font-bold text-foreground">
              {bookings.filter(b => b.booking_date === new Date().toISOString().split("T")[0]).length}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Hoje</p>
          </div>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone, serviço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-input border border-border rounded-sm pl-10 pr-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadBookings}
              className="text-muted-foreground text-sm font-body flex items-center gap-1.5 hover:text-primary transition-colors px-3 py-2 border border-border rounded-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
            </button>
            <button
              onClick={() => setConfirmClearAll(true)}
              className="text-destructive text-sm font-body flex items-center gap-1.5 hover:bg-destructive/10 transition-colors px-3 py-2 border border-destructive/30 rounded-sm"
            >
              <Trash2 className="w-4 h-4" /> Limpar tudo
            </button>
          </div>
        </div>

        {/* Bookings */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              {search ? "Nenhum resultado encontrado." : "Nenhum agendamento."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((b, i) => {
                const isPast = b.booking_date < new Date().toISOString().split("T")[0];
                const isToday = b.booking_date === new Date().toISOString().split("T")[0];

                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass-card rounded-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 group transition-all hover:border-primary/30 ${isPast ? "opacity-50" : ""} ${isToday ? "border-primary/40" : ""}`}
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 text-center">
                      <div className={`w-16 h-16 rounded-sm flex flex-col items-center justify-center ${isToday ? "gold-gradient" : "bg-secondary"}`}>
                        <span className={`text-lg font-display font-bold ${isToday ? "text-primary-foreground" : "text-foreground"}`}>
                          {b.booking_date.split("-")[2]}
                        </span>
                        <span className={`text-[10px] font-body uppercase tracking-wider ${isToday ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {new Date(b.booking_date + "T12:00:00").toLocaleDateString("pt-BR", { month: "short" })}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          {b.client_name}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-body font-semibold uppercase tracking-wider gold-gradient text-primary-foreground px-2 py-0.5 rounded-full">
                            Hoje
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {b.client_phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {b.booking_time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Scissors className="w-3 h-3 text-primary" /> {b.service}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0">
                      {confirmDeleteId === b.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeBooking(b.id)}
                            className="text-xs font-body font-semibold text-destructive-foreground bg-destructive px-3 py-1.5 rounded-sm hover:opacity-90 transition-opacity"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(b.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Clear All Modal */}
      <AnimatePresence>
        {confirmClearAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setConfirmClearAll(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-sm p-6 w-full max-w-sm text-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">Limpar todos?</h3>
              <p className="text-sm text-muted-foreground font-body">
                Essa ação vai apagar <strong>{bookings.length}</strong> agendamento(s) permanentemente.
              </p>
              <div className="flex items-center gap-3 justify-center pt-2">
                <button
                  onClick={() => setConfirmClearAll(false)}
                  className="px-5 py-2 text-sm font-body border border-border rounded-sm hover:bg-secondary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={clearAll}
                  className="px-5 py-2 text-sm font-body font-semibold bg-destructive text-destructive-foreground rounded-sm hover:opacity-90 transition-opacity"
                >
                  Apagar tudo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
