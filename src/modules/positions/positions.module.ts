import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { MongooseModule } from '@nestjs/mongoose';
import PositionSchema from 'src/database/schemas/position.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Position',
      schema: PositionSchema,
    },
  ])],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
