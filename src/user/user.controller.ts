/* eslint-disable */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
import { execPath } from 'process';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Get('test/:id')
  async getTestToWrite(@Param('id') id: string) {
    try{
        let test = await this.userService.getTestById(id);
        test.answers = []
        return test  
    }
    catch(e){
        return {...e, err_inf: 'Не удалось найти тест с этим id'}
    }
  }


  @Get('res_test/:id')
  async getTestWithResults(@Param('id') id: string){
    try{
        const test = await this.userService.getTestById(id);
        return test  
    }
    catch(e){
        return {...e, err_inf: 'Не удалось найти тест с этим id'}
    }
  }
  @Post('save_results')
  async saveTestResult(@Body() test_info: any, id: string){
      try {
          const profile = await this.userService.updateTestHistory(test_info, id)
          return {...profile, 'info': 'Результат теста сохранен'}
      }
      catch(e){
          return {...e, err_inf: 'Ошибка сохранения теста'}
      }
  }

}
