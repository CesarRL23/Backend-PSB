import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { SupabaseGuard } from './guards/supabase.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: SupabaseGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
