import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  async getAll() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    return data;
  },

  async getSummary() {
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, career, linkedin_url');
    if (error) throw error;
    
    // Return only the first name and first last name
    return (data || []).map(profile => ({
      ...profile,
      first_name: profile.first_name?.trim().split(/\s+/)[0] || '',
      last_name: profile.last_name?.trim().split(/\s+/)[0] || ''
    }));
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async create(profile: ProfileInsert) {
    const { data, error } = await supabase.from('profiles').insert(profile).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, profile: ProfileUpdate) {
    const { data, error } = await supabase.from('profiles').update(profile).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
