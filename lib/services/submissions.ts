import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];
type SubmissionInsert = Database['public']['Tables']['submissions']['Insert'];
type SubmissionUpdate = Database['public']['Tables']['submissions']['Update'];

export const submissionService = {
  async getAll() {
    const { data, error } = await supabase.from('submissions').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('submissions').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async create(submission: SubmissionInsert) {
    const { data, error } = await supabase.from('submissions').insert(submission).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, submission: SubmissionUpdate) {
    const { data, error } = await supabase.from('submissions').update(submission).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('submissions').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
