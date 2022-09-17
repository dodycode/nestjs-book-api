import { Prisma } from '@prisma/client';

// fix undefined error we use *
import * as _ from 'lodash';

export class BaseRepository {
  protected _model: any;

  constructor(model: any) {
    this._model = model;
  }

  /**
   * mapping where conditions to follow prisma js format
   * @param conditions
   * @returns
   */
  protected extractCondition(conditions: any) {
    const dbCond = _.isObject(conditions)
      ? conditions
      : { id: _.toNumber(conditions) };

    return dbCond;
  }

  /**
   * count rows
   * @param conditions
   * @param option
   * @returns
   */
  async count(conditions: any, option: any = {}) {
    const where = this.extractCondition(conditions);

    return this._model.count({ where, ...option });
  }

  /**
   * get filtered data
   * @param conditions
   * @param filterQueryParams
   * @param query
   * @param option
   * @returns
   */
  async findAll(
    conditions: any,
    filterQueryParams: any = {},
    query: any = {},
    option: any = {},
  ) {
    const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
    const offset = query.page && query.page > 0 ? limit * (query.page - 1) : 0;
    const otherOptions = _.omit(query, ['limit', 'offset', 'page']);
    const where = {
      ...this.extractCondition(conditions),
      ...filterQueryParams,
      ...otherOptions,
    };

    return {
      rows: await this._model.findMany({
        where,
        ...option,
        skip: offset,
        ...(limit > 0 && { take: limit }),
      }),
      count: await this.count(where),
    };
  }

  /**
   * select one data
   * @param conditions
   * @param option
   * @returns
   */
  async findOne(conditions: any, option: any = {}) {
    const where = this.extractCondition(conditions);

    return this._model.findFirst({ where, ...option });
  }

  /**
   * get unique data by conditions
   * @param conditions
   * @param option
   * @returns
   */
  async findUnique(conditions: any, option: any = {}) {
    const where = this.extractCondition(conditions);

    return this._model.findUnique({ where, ...option });
  }

  /**
   * insert data
   * @param data
   * @param option
   * @returns
   */
  async create(data: any, option: any = {}) {
    return this._model.create({ data, ...option });
  }

  /**
   * update data
   * @param conditions
   * @param data
   * @param option
   * @returns
   */
  async update(conditions: any, data: any, option: any = {}) {
    const where = this.extractCondition(conditions);

    return this._model.update({ data, where, ...option });
  }

  /**
   * delete rows by conditions
   * @param conditions
   * @returns
   */
  async delete(conditions: any) {
    const where = this.extractCondition(conditions);

    return this._model.deleteMany({ where });
  }

  /**
   * delete one row by conditions
   * @param conditions
   * @returns
   */
  async deleteOne(conditions: any) {
    const where = this.extractCondition(conditions);

    return this._model.delete({ where });
  }

  /**
   * update or create
   * @param conditions
   * @param data
   * @param option
   * @returns
   */
  async updateOrCreate(conditions: any, data: any, option: any = {}) {
    const selectedData = await this.findOne(conditions, option);

    if (selectedData) return this.update(conditions, data, option);

    return this.create(data, option);
  }

  /**
   * bulk insert
   * @param data
   * @param skipDuplicates
   * @returns
   */
  async bulkCreate(data: Prisma.Enumerable<any>, skipDuplicates = true) {
    return this._model.createMany({ data, skipDuplicates });
  }

  /**
   * bulk update
   * @param where
   * @param data
   * @returns
   */
  async bulkUpdate(where: any, data: Prisma.Enumerable<any>) {
    return this._model.updateMany({ data, where });
  }
}
