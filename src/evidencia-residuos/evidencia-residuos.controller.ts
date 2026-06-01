import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { EvidenciaResiduosService } from './evidencia-residuos.service';
import { CreateEvidenciaResiduoDto } from './dto/create-evidencia-residuo.dto';
import { UpdateEvidenciaResiduoDto } from './dto/update-evidencia-residuo.dto';

@Controller('evidencia-residuos')
export class EvidenciaResiduosController {
  constructor(private readonly evidenciaResiduosService: EvidenciaResiduosService) {}

  @Post()
  create(@Body() createEvidenciaResiduoDto: CreateEvidenciaResiduoDto) {
    return this.evidenciaResiduosService.create(createEvidenciaResiduoDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', '..', 'uploads', 'evidencias');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          cb(null, `${timestamp}_${sanitized}`);
        }
      })
    })
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEvidenciaResiduoDto: CreateEvidenciaResiduoDto,
  ) {
    return this.evidenciaResiduosService.createWithFile(createEvidenciaResiduoDto, file);
  }

  @Get()
  findAll() {
    return this.evidenciaResiduosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidenciaResiduosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvidenciaResiduoDto: UpdateEvidenciaResiduoDto) {
    return this.evidenciaResiduosService.update(+id, updateEvidenciaResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidenciaResiduosService.remove(+id);
  }
}
