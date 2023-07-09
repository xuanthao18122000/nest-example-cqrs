import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UsersDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { BaseService } from "src/modules/common/base/base.service";

@Injectable()
export class UserRepository extends BaseService<UsersDocument> {
  constructor(
    @InjectModel(User.name)
    public model: Model<UsersDocument>,
  ) {
    super(model);
  }
  /**
   *
   * @param id : string
   */
  async updateDistance(id: string, distance) {
    return this.model.findByIdAndUpdate(
      id,
      { $inc: { distance: distance } },
      {
        new: true,
      },
    );
  }
}
