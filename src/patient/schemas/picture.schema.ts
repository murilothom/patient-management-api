import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Picture {
  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, example: '1705972324045.png' })
  name: string;

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, example: 'uploads/pictures/1705972324045.png' })
  src: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    example: 'data:image/image/png;base64,iVBORw0K...',
  })
  base64: string;
}
