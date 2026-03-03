import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";

/* ─── helpers ─── */
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WEEKDAYS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

const generateSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = 9; h <= 19; h++) {
    slots.push(`${String(h).padStart(2,"0")}:00`);
    if (h < 19 || h === 19) slots.push(`${String(h).padStart(2,"0")}:30`);
  }
  // remove 20:00 if generated
  return slots.filter(s => s <= "19:30");
};

const TIME_SLOTS = generateSlots();

const getBookings = (): Record<string, string[]> => {
  try {
    return JSON.parse(localStorage.getItem("barbosa_bookings") || "{}");
  } catch { return {}; }
};

const getClientData = (): Array<{date:string;time:string;name:string;phone:string}> => {
  try {
    return JSON.parse(localStorage.getItem("barbosa_clients") || "[]");
  } catch { return []; }
};

const saveBooking = (date: string, time: string, name: string, phone: string) => {
  const bookings = getBookings();
  if (!bookings[date]) bookings[date] = [];
  bookings[date].push(time);
  localStorage.setItem("barbosa_bookings", JSON.stringify(bookings));

  const clients = getClientData();
  clients.push({ date, time, name, phone });
  localStorage.setItem("barbosa_clients", JSON.stringify(clients));
};

const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

const BookingSystem = () => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Record<string, string[]>>(getBookings);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setBookings(getBookings());
  }, [selectedDate]);

  /* calendar grid */
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isDaySelectable = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d.getDay() === 0) return false; // sunday
    const t = new Date(); t.setHours(0,0,0,0);
    return d >= t;
  };

  const handleConfirm = useCallback(() => {
    setError("");
    if (!name.trim()) { setError("Preencha seu nome."); return; }
    if (!phone.trim() || phone.length < 8) { setError("Preencha um telefone válido."); return; }
    if (!selectedDate || !selectedTime) { setError("Selecione data e horário."); return; }

    saveBooking(selectedDate, selectedTime, name.trim(), phone.trim());
    setBookings(getBookings());
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setSelectedTime(null);
      setName("");
      setPhone("");
    }, 3000);
  }, [name, phone, selectedDate, selectedTime]);

  const occupiedSlots = selectedDate ? (bookings[selectedDate] || []) : [];

  return (
    <section id="agendamento" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">Reserve agora</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            <span className="gold-text">Agendamento</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="glass-card rounded-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="font-display font-bold text-lg text-foreground">
                {MONTHS[viewMonth]} {viewYear}
              </h3>
              <button onClick={nextMonth} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map(w => (
                <div key={w} className="text-center text-xs font-body text-muted-foreground uppercase py-2">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const key = dateKey(new Date(viewYear, viewMonth, day));
                const selectable = isDaySelectable(day);
                const isSelected = selectedDate === key;
                const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;
                return (
                  <button
                    key={day}
                    disabled={!selectable}
                    onClick={() => { setSelectedDate(key); setSelectedTime(null); }}
                    className={`aspect-square flex items-center justify-center rounded-sm text-sm font-body transition-all
                      ${!selectable ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                      ${isSunday ? "text-destructive/40" : ""}
                      ${selectable && !isSelected ? "hover:bg-primary/10 text-foreground cursor-pointer" : ""}
                      ${isSelected ? "gold-gradient text-primary-foreground font-bold" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots + form */}
          <div className="glass-card rounded-sm p-6 flex flex-col">
            {!selectedDate ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-body">
                Selecione uma data no calendário
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-foreground mb-4">
                  Horários — <span className="gold-text">{selectedDate}</span>
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6 max-h-48 overflow-y-auto pr-1">
                  {TIME_SLOTS.map(slot => {
                    const occupied = occupiedSlots.includes(slot);
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        disabled={occupied}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-1 rounded-sm text-sm font-body font-medium transition-all border
                          ${occupied
                            ? "bg-destructive/20 text-destructive border-destructive/30 cursor-not-allowed line-through"
                            : isSelected
                              ? "gold-gradient text-primary-foreground border-transparent font-bold"
                              : "border-border text-foreground hover:border-primary/50 cursor-pointer bg-surface-hover"
                          }
                        `}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {/* Form */}
                <div className="space-y-3 mt-auto">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-input border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-input border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-destructive text-sm font-body flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedTime}
                    className="w-full gold-gradient text-primary-foreground font-body font-semibold py-3 rounded-sm uppercase tracking-wider text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Confirmar Agendamento
                  </button>

                  <AnimatePresence>
                    {confirmed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-green-400 font-body text-sm mt-2"
                      >
                        <Check className="w-5 h-5" /> Agendamento confirmado com sucesso!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
