/* eslint-disable */
import { Controller, Get, Query, Param, Delete, Patch, Body, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { LoadTestDto } from "./dto/load-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService){}
    
    @Post('create_test')
    async create(loadTestDto: LoadTestDto) {
        try {
            const test = await this.adminService.createTest(loadTestDto) 
            return {...test, info:'Тест создан'}
        }
        catch(e) {
            return {...e, info: 'Ошибка создания теста'}
        }
      }

    @Get('tests')
    find(@Query('limit') limit: number) {
        return this.adminService.getTests(limit)
    }

    @Get('test/:id')
    async getTest(@Param('id') id: string) {
        try{
            const test = await this.adminService.getTestById(id);
            return test  
        }
        catch(e){
            return {...e, err_inf: 'Не удалось найти тест с этим id'}
        }
  }

  
    @Delete('del_test/:id')
    async remove(@Param('id') id: string) {
        try {
            const test = await this.adminService.remove(id);
            return test
        }
        catch(e) {
            return {...e, err_inf: 'Ошибка удаления теста'}
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.adminService.update(id, updateTestDto);
    }

}
