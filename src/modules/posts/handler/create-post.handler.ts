import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "../commands/create-post.command";
import { PostRepository } from "src/database/repository/post.repository";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(
        private postRepository: PostRepository
    ) {}

    async execute(command: CreatePostCommand): Promise<any> {
        command.createPostDto.user = command.user._id;
    }
}