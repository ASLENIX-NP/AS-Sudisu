import { supabase } from "./supabase";

const originalFetch = window.fetch;

window.fetch = async (input, init = {}) => {
  const url = typeof input === "string" ? input : input?.url;
  
  if (url && url.includes(import.meta.env.VITE_API_BASE_URL)) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${session.access_token}`
      };
    }
  }
  
  return originalFetch(input, init);
};
