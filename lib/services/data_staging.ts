import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type DataStaging = Database['public']['Tables']['data_staging']['Row'];
type DataStagingInsert = Database['public']['Tables']['data_staging']['Insert'];
type DataStagingUpdate = Database['public']['Tables']['data_staging']['Update'];

export const dataStagingService = {
  async getAll() {
    const { data, error } = await supabase.from('data_staging').select('*');
    if (error) throw error;
    return data;
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase.from('data_staging').select('*').eq('email', email).single();
    if (error) throw error;
    return data;
  },

  async create(data: DataStagingInsert) {
    const { data: created, error } = await supabase.from('data_staging').insert(data).select().single();
    if (error) throw error;
    return created;
  },

  async update(email: string, data: DataStagingUpdate) {
    const { data: updated, error } = await supabase.from('data_staging').update(data).eq('email', email).select().single();
    if (error) throw error;
    return updated;
  },

  async delete(email: string) {
    const { error } = await supabase.from('data_staging').delete().eq('email', email);
    if (error) throw error;
    return true;
  },
};
