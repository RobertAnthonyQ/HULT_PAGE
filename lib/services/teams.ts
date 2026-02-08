import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Team = Database['public']['Tables']['teams']['Row'];
type TeamInsert = Database['public']['Tables']['teams']['Insert'];
type TeamUpdate = Database['public']['Tables']['teams']['Update'];

export const teamService = {
  async getAll() {
    const { data, error } = await supabase.from('teams').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('teams').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async create(team: TeamInsert) {
    const { data, error } = await supabase.from('teams').insert(team).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, team: TeamUpdate) {
    const { data, error } = await supabase.from('teams').update(team).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('teams').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
