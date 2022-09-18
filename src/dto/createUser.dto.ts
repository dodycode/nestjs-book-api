import { createZodDto } from 'nestjs-zod';
import { AuthorSchema } from 'src/utils/schema';

// class is required for using DTO as a type
export class CreateUserDto extends createZodDto(AuthorSchema.create) {}
