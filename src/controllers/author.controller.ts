import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { AuthorRepository } from 'src/repositories/author';
import { PrismaService } from 'src/services/prisma.service';

@Controller('author')
export class AuthorController {
  protected authorRepositoryClass: AuthorRepository;
  constructor() {
    this.authorRepositoryClass = new AuthorRepository(new PrismaService());
  }

  @Get()
  async getAuthors(@Req() req) {
    return await this.authorRepositoryClass.findAll(
      {},
      req?.filterQueryParams,
      req?.query,
    );
  }

  @Post()
  async createAuthor(@Req() req) {
    //map body req
    const newAuthor = this.authorRepositoryClass.resourceToModel(req.body);

    return await this.authorRepositoryClass.create({ ...newAuthor });
  }

  @Patch('/:id')
  async updateAuthor(@Req() req) {
    //map body req
    const updatedAuthor = this.authorRepositoryClass.resourceToModel(req.body);

    return await this.authorRepositoryClass.update(req.params.id, {
      ...updatedAuthor,
    });
  }

  @Delete('/:id')
  async deleteAuthor(@Req() req) {
    return await this.authorRepositoryClass.delete(req.params.id);
  }
}
