// supabase-config.js
const SUPABASE_URL = 'https://qbgubcicjqkgowxgrmmp.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZ3ViY2ljanFrZ293eGdybW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQzMTksImV4cCI6MjA5ODkyMDMxOX0.U8ILE_4Y89k9K3AQkOgNqDpYunwzDm4jBMWv1yPlE24';

// Initialize Supabase Client (make sure to include the supabase-js library in your HTML before this script)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON) : null;
