import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('repair_types')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }

  return NextResponse.json(data);
}
