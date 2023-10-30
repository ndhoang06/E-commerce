import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {

  uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result.url)
      })
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    })
  }

  async deleteFile(fileToDelete) {
    try {
      const deleteFile = cloudinary.uploader.destroy(fileToDelete)
      return deleteFile
    } catch (error) {
      throw error
    }

  }
}
