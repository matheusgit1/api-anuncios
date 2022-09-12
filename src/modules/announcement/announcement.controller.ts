import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsString } from 'class-validator';
import { FormDataRequest, HasMimeType } from 'nestjs-form-data';
import Ajv, { JSONSchemaType } from 'ajv';

export interface data {
  mvnos: number[];
  name: string;
}

export class validateBody {
  @HasMimeType(['file/json'])
  data: any;
}

@Controller('/v1/announcement')
export class AnnouncementController {
  @Get('/')
  getA(): string {
    return 'this a route of announcement';
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('data'))
  uploadFile(@UploadedFile() file) {
    // console.log(file)
    const ajv = new Ajv();
    const schema = {
      properties: {
        mvnos: { type: 'array', nullable: false },
        name: { type: 'string', nullable: false },
      },
      required: ['mvnos', 'name'],
      additionalProperties: false,
    };

    const data = Buffer.from(file.buffer, 'utf-8').toString();
    const valid = ajv.validate(schema, data);
    console.log(Buffer.from(file.buffer, 'utf-8').toString(), valid);

    return;
  }
}
