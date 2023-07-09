import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Request } from 'express';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }

  @Post()
  async createPost(@Req() req: Request, @Body() post: CreatePostDto) {
    req['user'] = { id: 1, email: 'admin@gmail.com'}
    return await this.postsService.create(req['user'], post);
  }

  @Get('id')
  async getOnePost(@Param('id') id: string) {
    return await this.postsService.getOne(id);
  }
}
