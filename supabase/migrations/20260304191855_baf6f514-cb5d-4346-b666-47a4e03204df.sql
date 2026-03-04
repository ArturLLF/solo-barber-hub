-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (booking_date, booking_time)
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read bookings (to check availability)
CREATE POLICY "Anyone can view bookings" ON public.bookings
  FOR SELECT USING (true);

-- Allow anyone to insert bookings (public booking system)
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can delete (for admin)
CREATE POLICY "Authenticated users can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING (true);