import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from 'src/modules/database/schemas/user.schema';
import { CreatePostCommand } from '../commands/create-post.command';
import { GetPostQuery } from '../queries/get-post.query';

@Injectable()
export class PostsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ){}

  getAll() {
    return true;
  }

  async getOne(id: string) {
    return await this.queryBus.execute(new GetPostQuery(id));
  }

  async create(user: User, post: CreatePostDto) {
    return await this.commandBus.execute(new CreatePostCommand(user, post));
  }
}
