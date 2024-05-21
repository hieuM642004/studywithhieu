import { Module } from "@nestjs/common";
import { CommentGateway } from "./comment-gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "./schemas/comment.schema";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";


@Module({
    imports:[MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
    controllers:[],
    providers:[CommentGateway]
})
export class CommentModule{
   
}