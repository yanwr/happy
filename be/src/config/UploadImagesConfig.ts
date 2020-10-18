import multer from 'multer';
import path from 'path';

const config =  {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'resources', 'upload'),
    filename: (request, file, callBack) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callBack(null, fileName);
    }
  })
};

export default multer(config);