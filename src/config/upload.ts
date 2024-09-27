import multer from "multer";
import { resolve } from "path";
import { v4 as uuidv4 } from 'uuid';

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileUuid = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${fileUuid}.${fileExtension}`;
      
      return callback(null, fileName);
    },
  }),
};
