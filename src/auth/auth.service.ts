import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ws from 'ws';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const anonKey = this.config.get<string>('SUPABASE_ANON_KEY');
    const secretKey = this.config.get<string>('SUPABASE_SECRET_KEY');

    if (!url || !anonKey || !secretKey)
      throw new Error('Faltan variables de entorno de Supabase');

    this.supabase = createClient(url, anonKey, { realtime: { transport: ws } });
    this.supabaseAdmin = createClient(url, secretKey, { realtime: { transport: ws } });
  }

  async getUser(token: string) {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error || !user) throw new UnauthorizedException('Token inválido');
    return user;
  }

  async createUser(
    email: string,
    password: string,
    metadata: { role: string; nombre: string; apellido?: string },
  ) {
    const { data, error } = await this.supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata,
    });

    if (error) throw new Error(error.message);
    return data.user;
  }
}
