import {
  PipeTransform,
  Injectable,
  BadRequestException,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

@Injectable()
export class OptionalFilePipe implements PipeTransform {
  async transform(value: any) {
    if (!value) {
      return undefined;
    }

    const file = value as Express.Multer.File;

    const maxFileSizeValidator = new MaxFileSizeValidator({ maxSize: 100000 });
    const fileTypeValidator = new FileTypeValidator({
      fileType: /^(image\/jpeg|image\/png)$/,
    });

    try {
      maxFileSizeValidator.isValid(file);
      fileTypeValidator.isValid(file);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return file;
  }
}
