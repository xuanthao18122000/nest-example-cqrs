import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePositionDto, UpdatePositionDto } from './dto/position.dto';

@Controller('positions')
@ApiTags('Positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async getListPosition() {
    return await this.positionsService.getAll();
  }

  @Post()
  async createPosition(@Body() body: CreatePositionDto) {
    return await this.positionsService.create(body);
  }

  @Get(':id')
  async getDetailPosition(@Param('id') id: string) {
    return await this.positionsService.getOne(id);
  }

  @Put(':id')
  async updatePosition(@Param('id') id: string, @Body() body: UpdatePositionDto) {
    return await this.positionsService.update(id, body);
  }

  @Delete(':id')
  async deletePosition(@Param('id') id: string) {
    return await this.positionsService.delete(id);
  }
}
