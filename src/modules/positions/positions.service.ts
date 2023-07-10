import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionsDocument } from 'src/database/schemas/position.schema';
import { CreatePositionDto, UpdatePositionDto } from './dto/position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position.name) private readonly positionModel: Model<PositionsDocument> 
    ) {}

  async getAll() {
    return await this.positionModel.find().exec();
  }

  async getOne(id: string) {
    return await this.positionModel.findById(id);
  }

  async create(body: CreatePositionDto){
    const employee = new this.positionModel();
    return await employee.save();
  }

  async update(id: string, body: UpdatePositionDto) {
    return await this.positionModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string) {
    return await this.positionModel.findByIdAndRemove(id);
  }
}
