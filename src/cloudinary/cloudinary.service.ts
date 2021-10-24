import { Injectable } from '@nestjs/common';
import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export default class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error || result === undefined) return reject(error);
        return resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async removeImage(public_id: string): Promise<any> {
    const dataDetroy = await v2.uploader.destroy(public_id);
    return dataDetroy;
  }
}