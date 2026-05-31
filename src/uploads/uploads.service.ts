import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { extname } from 'path';
import ws from 'ws';

@Injectable()
export class UploadsService {
  private supabase: SupabaseClient;
  private readonly bucket = 'archivos';

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL')!;
    const key = this.config.get<string>('SUPABASE_SECRET_KEY')!;
    this.supabase = createClient(url, key, { realtime: { transport: ws } });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const ext = extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new InternalServerErrorException(`Error al subir archivo: ${error.message}`);

    const { data } = this.supabase.storage.from(this.bucket).getPublicUrl(filename);
    return data.publicUrl;
  }
}
