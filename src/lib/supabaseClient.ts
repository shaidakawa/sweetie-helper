import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtvykicvruylvjdqouyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnlraWN2cnV5bHZqZHFvdXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NTY1NTAsImV4cCI6MjA2MTMzMjU1MH0.qu58Jg9orGDsqpn8Gy2IPcEB4r3BFI-qWlZRdUAaJY0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
