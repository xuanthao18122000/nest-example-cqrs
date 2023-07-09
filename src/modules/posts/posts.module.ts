import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import PostSchema from '../database/schemas/post.schema';
import { CreatePostHandler } from './handler/create-post.handler';
import { GetPostHandler } from './handler/get-post.handler';
import { PostRepository } from '../database/repository/post.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import UserSchema from '../database/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Post',
      schema: PostSchema,
    },
    {
      name: 'User',
      schema: UserSchema,
    }
  ])],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, CreatePostHandler, GetPostHandler, CommandBus, QueryBus],
})
export class PostsModule {}
