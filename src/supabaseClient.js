import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmriglkkucnhilgkwuml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmlnbGtrdWNuaGlsZ2t3dW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMzI0NDgsImV4cCI6MjA2MTgwODQ0OH0.TKGJdIWI1AKOX9lkPt8ml9Fq7zgwyZ-m5PfHxinzfn4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
