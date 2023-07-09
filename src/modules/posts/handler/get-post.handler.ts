import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostQuery } from "../queries/get-post.query";
import { PostRepository } from "src/modules/database/repository/post.repository";


@QueryHandler(GetPostQuery)
export class GetPostHandler implements ICommandHandler<GetPostQuery> {
    constructor(
        private postRepository: PostRepository,
    ) {}

    async execute(command: GetPostQuery): Promise<any> {
        return await this.postRepository.findIdOrFail(command.post_id);
    }
}