import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const permitidos = [
          'image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (!permitidos.includes(file.mimetype)) {
          cb(new BadRequestException('Tipo de archivo no permitido. Se aceptan imágenes, PDF, Word y Excel'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');
    const path = await this.uploadsService.upload(file);
    return { path };
  }

  @Get('signed-url')
  async getSignedUrl(@Query('path') path: string) {
    if (!path) throw new BadRequestException('El parámetro path es requerido');
    const url = await this.uploadsService.getSignedUrl(path);
    return { url };
  }
}
