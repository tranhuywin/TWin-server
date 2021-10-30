import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadApiResponse } from 'cloudinary';
import CloudinaryService from './cloudinary.service';

@Controller('cloudinary')
@ApiTags("cloudinary")
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post('/upload-image')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{urlImage: string}> {
        return this.cloudinaryService.uploadImage(file).then((response: UploadApiResponse) =>{
            return {urlImage: response.url};
        });
    }

    @Delete('/remove/:publicid')
    removeImage(@Param('publicid') publicid: string): Promise<any>{
      return this.cloudinaryService.removeImage(publicid);
    }    
}
