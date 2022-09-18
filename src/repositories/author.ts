import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { PrismaService } from 'src/services/prisma.service';
import { BaseRepository } from './baseRepository';

@Injectable()
export class AuthorRepository extends BaseRepository {
  constructor(private prisma: PrismaService) {
    super(prisma.author);
  }

  //fillable fields in db
  resourceToModel(resource: any) {
    const model = _.pick(resource, ['firstName', 'lastName']);

    return model;
  }
}
