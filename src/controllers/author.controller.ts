import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
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
    try {
      return await this.authorRepositoryClass.findAll(
        {},
        req?.filterQueryParams,
        req?.query,
      );
    } catch (error) {
      throw new HttpException(error?.meta?.cause, 500);
    }
  }

  @Post()
  async createAuthor(@Body() bodyReq: CreateUserDto) {
    //map body req
    const newAuthor = this.authorRepositoryClass.resourceToModel(bodyReq);

    try {
      return await this.authorRepositoryClass.create({ ...newAuthor });
    } catch (error) {
      throw new HttpException(error?.meta?.cause, 500);
    }
  }

  @Patch('/:id')
  async updateAuthor(@Body() bodyReq: UpdateUserDto, @Param('id') id: number) {
    //map body req
    const updatedAuthor = this.authorRepositoryClass.resourceToModel(bodyReq);

    try {
      return await this.authorRepositoryClass.update(id, {
        ...updatedAuthor,
      });
    } catch (error) {
      throw new HttpException(error?.meta?.cause, 500);
    }
  }

  @Delete('/:id')
  async deleteAuthor(@Param('id') id: number) {
    try {
      return await this.authorRepositoryClass.delete(id);
    } catch (error) {
      throw new HttpException(error?.meta?.cause, 500);
    }
  }
}
