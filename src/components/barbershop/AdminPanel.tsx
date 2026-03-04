import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

type BookingEntry = {
  id: string;
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_phone: string;
};

const AdminPanel = ({ open, onClose }: AdminPanelProps) => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [pwError, setPwError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (open && authed) loadData();
    if (!open) { setAuthed(false); setPassword(""); setPwError(false); }
  }, [open, authed]);

  const handleLogin = () => {
    if (password === "admin123") { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  const removeEntry = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const clearAll = async () => {
    // Delete all bookings
    const ids = bookings.map(b => b.id);
    if (ids.length > 0) {
      await supabase.from("bookings").delete().in("id", ids);
    }
    setBookings([]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card border-primary/30 rounded-sm w-full max-w-2xl max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display font-bold text-lg gold-text">Painel Admin</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!authed ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <p className="text-sm text-muted-foreground font-body">Digite a senha de administrador</p>
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPwError(false); }}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    className="w-60 bg-input border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground text-center focus:outline-none focus:border-primary"
                    placeholder="Senha"
                  />
                  {pwError && (
                    <p className="text-destructive text-sm font-body flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Senha incorreta
                    </p>
                  )}
                  <button onClick={handleLogin} className="gold-gradient text-primary-foreground px-8 py-2 rounded-sm text-sm font-body font-semibold uppercase tracking-wider">
                    Entrar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground font-body">{bookings.length} agendamento(s)</p>
                    <div className="flex items-center gap-3">
                      <button onClick={loadData} className="text-muted-foreground text-xs font-body flex items-center gap-1 hover:text-primary transition-colors">
                        <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} /> Atualizar
                      </button>
                      <button onClick={clearAll} className="text-destructive text-xs font-body flex items-center gap-1 hover:underline">
                        <Trash2 className="w-3 h-3" /> Limpar tudo
                      </button>
                    </div>
                  </div>
                  {bookings.length === 0 ? (
                    <p className="text-center text-muted-foreground font-body py-8">Nenhum agendamento.</p>
                  ) : (
                    <div className="space-y-2">
                      {bookings.map(b => (
                        <div key={b.id} className="flex items-center justify-between bg-surface-hover rounded-sm px-4 py-3">
                          <div>
                            <p className="text-sm font-body font-medium text-foreground">{b.client_name} — {b.client_phone}</p>
                            <p className="text-xs text-muted-foreground font-body">{b.booking_date} às {b.booking_time}</p>
                          </div>
                          <button onClick={() => removeEntry(b.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
