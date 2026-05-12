import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ws from 'ws';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_ANON_KEY');

    if (!url || !key)
      throw new Error('Faltan variables de entorno de Supabase');

    this.supabase = createClient(url, key, {
      realtime: {
        transport: ws,
      },
    });
  }

  async getUser(token: string) {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error || !user)
      throw new UnauthorizedException('Token inválido');

    return user;
  }
}