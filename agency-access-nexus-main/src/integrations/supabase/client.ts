
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bksuxomvqasbgrkykovh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc3V4b212cWFzYmdya3lrb3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzIxMTksImV4cCI6MjA2MTEwODExOX0.KjS2CzXj0nPD2d3BFWqPhXEsF9ub6SpCtRjGAItMaaw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
