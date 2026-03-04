import { useState, useEffect } from "react";
import { Trash2, RefreshCw, LogOut, AlertTriangle } from "lucide-react";
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
  };

  const clearAll = async () => {
    if (!confirm("Tem certeza que deseja apagar TODOS os agendamentos?")) return;
    const ids = bookings.map((b) => b.id);
    if (ids.length > 0) {
      await supabase.from("bookings").delete().in("id", ids);
    }
    setBookings([]);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass-card rounded-sm p-8 w-full max-w-sm text-center space-y-4">
          <h1 className="text-2xl font-display font-bold gold-text">Painel Admin</h1>
          <p className="text-sm text-muted-foreground font-body">Digite a senha de administrador</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Senha"
            className="w-full bg-input border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground text-center focus:outline-none focus:border-primary"
          />
          {pwError && (
            <p className="text-destructive text-sm font-body flex items-center justify-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Senha incorreta
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full gold-gradient text-primary-foreground px-8 py-3 rounded-sm text-sm font-body font-semibold uppercase tracking-wider"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-display font-bold gold-text">Painel Admin — Barbosa's Barber</h1>
          <button onClick={() => setAuthed(false)} className="text-muted-foreground hover:text-foreground text-sm font-body flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground font-body">{bookings.length} agendamento(s)</p>
          <div className="flex items-center gap-4">
            <button onClick={loadBookings} className="text-muted-foreground text-sm font-body flex items-center gap-1 hover:text-primary transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
            </button>
            <button onClick={clearAll} className="text-destructive text-sm font-body flex items-center gap-1 hover:underline">
              <Trash2 className="w-4 h-4" /> Limpar tudo
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground font-body py-16">Nenhum agendamento encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground uppercase text-xs tracking-wider">
                  <th className="pb-3 pr-4">Data</th>
                  <th className="pb-3 pr-4">Horário</th>
                  <th className="pb-3 pr-4">Nome</th>
                  <th className="pb-3 pr-4">Telefone</th>
                  <th className="pb-3 pr-4">Serviço</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                    <td className="py-3 pr-4 text-foreground">{b.booking_date}</td>
                    <td className="py-3 pr-4 text-foreground">{b.booking_time}</td>
                    <td className="py-3 pr-4 text-foreground font-medium">{b.client_name}</td>
                    <td className="py-3 pr-4 text-foreground">{b.client_phone}</td>
                    <td className="py-3 pr-4 text-primary">{b.service || "—"}</td>
                    <td className="py-3 text-right">
                      <button onClick={() => removeBooking(b.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
