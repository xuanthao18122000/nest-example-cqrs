import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../commands/create-post.command';
import { GetPostQuery } from '../queries/get-post.query';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostsDocument, User } from 'src/database/schemas';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(Post.name)
    public postsModel: Model<PostsDocument>,
  ){}

  async getAll() {
    return await this.postsModel.find().exec();
  }

  async getOne(id: string) {
    return await this.queryBus.execute(new GetPostQuery(id));
  }

  async findOne(id: string) {
    return await this.postsModel.findById(id);
  }

  async create(user: User, post: CreatePostDto) {
    return await this.commandBus.execute(new CreatePostCommand(user, post));
  }

  async create2(createEmployeeDto: CreatePostDto): Promise <PostsDocument> {
    const user = new this.postsModel({ });
    return user.save();
  }
}
