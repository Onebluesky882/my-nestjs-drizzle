import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { Lists } from './list.dto';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Get()
  getAllTitle() {
    return this.listsService.getAllTitle();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log('Query ID:', id);
    return this.listsService.getPostById(id);
  }

  @Post()
  insertPost(@Body() list: Lists) {
    return this.listsService.insert({
      title: list.title,
      content: list.content,
    });
  }

  @Put()
  updatePost(@Query('id') id: string, @Body() list: Lists) {
    return this.listsService.updateById(id, {
      title: list.title,
      content: list.content,
    });
  }

  @Delete()
  deletePost(@Query('id') id: string) {
    return this.listsService.delete(id);
  }
}
