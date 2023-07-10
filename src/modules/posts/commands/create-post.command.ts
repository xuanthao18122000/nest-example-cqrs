import { User } from "src/database/schemas/user.schema";
import { CreatePostDto } from "../dto/create-post.dto";

export class CreatePostCommand {
    constructor(
        public readonly user: User,
        public readonly createPostDto: CreatePostDto,
    ) {}
}