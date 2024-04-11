import { Module } from '@nestjs/common';
import { EncodingsService } from './encodings.service';
import { EncodingsController } from './encodings.controller';

@Module({
  controllers: [EncodingsController],
  providers: [EncodingsService],
})
export class EncodingsModule {}
