import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    
    ) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAll();
  }

  @Post()
  async createPost(@Req() req: Request, @Body() post: CreatePostDto) {
    req['user'] = { id: 1, email: 'admin@gmail.com'}
    return await this.postsService.create2(post);
  }

  @Get(':id')
  async getOnePost(@Param('id') id: string) {
    return await this.postsService.getOne(id);
  }

  @Get('ad/:id')
  async getOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }
}
