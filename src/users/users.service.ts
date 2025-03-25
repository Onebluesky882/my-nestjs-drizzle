import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: { ...createUserDto } });
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: string) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
