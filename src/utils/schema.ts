import _ from 'lodash';
import { z } from 'nestjs-zod/z';

export const AuthorSchema = {
  create: z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
  }),
  update: z.object({
    firstName: z.string().nonempty().optional(),
    lastName: z.string().nonempty().optional(),
  }),
};
