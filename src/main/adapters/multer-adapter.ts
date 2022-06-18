import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';
import { container } from '../di/container';

const loggerGateway = container.resolve('loggerGateway');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const pathToSave = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
      );
      cb(null, pathToSave);
    },
    filename: (req, file, cb) => {
      const fileHash = randomUUID();
      const fileName = `${fileHash}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    loggerGateway.info(`Upload file filter. File: ${JSON.stringify(file)}`);
    const allowedFormats = [
      'image/jpeg',
      'image/pjpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/pdf',
      'image/webp',
    ];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export { upload };
