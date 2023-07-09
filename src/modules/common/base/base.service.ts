import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BaseService as BaseServiceDeclare } from "../declares";
import mongoose, { Document } from "mongoose";
import { User } from "../../database/schemas";

@Injectable()
export class BaseService<T = any> implements BaseServiceDeclare<T> {
  constructor(protected model) {}

  /**
   *
   * @param itemId
   * @param customerId
   * @param session
   */
  async findItemIdByCustomer(
    itemId: string,
    customerId: string,
    session: mongoose.ClientSession | null = null,
  ) {
    return this.model
      .findOne({ _id: itemId, customer: customerId })
      .session(session)
      .exec();
  }

  /**
   * findItemIdByUser
   * @param itemId
   * @param user
   * @param session
   */
  async findItemIdByCreated(
    itemId: string,
    user: User,
    session: mongoose.ClientSession | null = null,
  ) {
    return this.model
      .findOne({ _id: itemId, created: user })
      .session(session)
      .exec();
  }

  /**
   *
   * @param itemId
   * @param customerId
   * @param session
   */
  async findItemIdByCustomerAndDelete(
    itemId: string,
    customerId: string,
    session: mongoose.ClientSession | null = null,
  ) {
    return this.model
      .findOneAndDelete({ _id: itemId, customer: customerId })
      .session(session)
      .exec();
  }

  /**
   *
   * @param data
   * @param session
   */
  async actionCreate(
    data: any,
    session: mongoose.ClientSession | null = null,
  ): Promise<T> {
    try {
      return await this.model.create(data, session);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   *
   * @param _id
   * @param data
   * @param user
   */
  actionFindByIdAndUpdate = async (
    _id: any,
    data: any,
    user: User | undefined = undefined,
  ): Promise<T> => {
    data = user ? { ...data, updated: user } : data;
    await this.model.findByIdAndUpdate(_id, { ...data });
    return await this.model.findById(_id);
  };

  /**
   *
   * @param _id
   */
  async actionFindById(_id: string): Promise<T> {
    try {
      return await this.model.findById(_id);
    } catch (e) {
      return;
    }
  }

  /**
   *
   * @param data
   */
  async actionCreateMany(data: any[]): Promise<any[]> {
    return this.model.insertMany(data);
  }

  /**
   *
   */
  async actionGetAll(): Promise<any[]> {
    return this.model.find({});
  }

  /**
   *
   */
  async actionDeleteAll(): Promise<any> {
    return this.model.deleteMany({});
  }

  /**
   *
   * @param _id
   *
   */
  actionFindByIdAndDelete = async (_id: string): Promise<T> => {
    return await this.model.FindByIdAndDelete(_id);
  };

  /**
   *
   * @param query
   * @param page
   * @param limit
   * @param sort
   * @param select
   * @param populate
   */
  async pagination(
    query: object = {},
    page = 1,
    limit = 10,
    sort: object | undefined = {},
    select: string[] | undefined = undefined,
    populate: any[] | object | string | undefined = undefined,
  ) {
    if (Object.keys(query).length) {
      for (const i in query) {
        if (query[i] === undefined) {
          delete query[i];
        }
      }
    }
    if (sort && Object.keys(sort).length) {
      for (const i in sort) {
        if (sort[i] === "DESC") {
          sort[i] = -1;
        } else if (sort[i] === "ASC") {
          sort[i] = 1;
        } else {
          delete sort[i];
        }
      }
    }

    const offset = (page - 1) * limit;

    const customLabels = {
      docs: "nodes",
      page: "currentPage",
      totalPages: "pageCount",
      limit: "perPage",
      totalDocs: "itemCount",
    };
    return await this.model.paginate(query, {
      customLabels,
      offset,
      limit,
      sort,
      select: select ? select : undefined,
      populate: populate ?? undefined,
    });
  }

  /**
   *
   * @param itemId
   */
  async findIdOrFail(itemId: string) {
    const item = this.actionFindById(itemId);
    if (!item)
      throw new HttpException(
        {
          message: `item ${this.model.name} do not exists `,
        },
        HttpStatus.NOT_FOUND,
      );
    return item;
  }

  /**
   *
   * @param _id
   * @param user
   */
  async softDeleteById(_id: string, user: User) {
    return this.model.delete({ _id }, user._id);
  }

  /**
   *
   * @param _id
   */
  async restoreSoftDeleteById(_id: string) {
    return this.model.restore({ _id });
  }

  /**
   *
   * @param itemId
   * @param user
   * @param session
   */
  async findItemIdByCreatedOrFail(
    itemId: string,
    user: User,
    session: mongoose.ClientSession | null = null,
  ) {
    const item = this.findItemIdByCreated(itemId, user, session);
    if (!item)
      throw new HttpException(
        {
          message: `item ${this.model.name} do not exists `,
        },
        HttpStatus.NOT_FOUND,
      );
    return item;
  }

  /**
   *
   * @param field
   * @param keyword
   */
  searchField(field: string[], keyword: string) {
    if (!keyword || !field.length) return undefined;
    const queryOr: object[] | undefined = [];
    field.map((item) => {
      const object = {};
      object[item] = { $regex: ".*" + keyword + ".*", $options: "i" };
      queryOr.push(object);
    });
    return queryOr;
  }
}
