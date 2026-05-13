import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Post()
    async create(@Body() body: any) {
        return this.companyService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(id);
    }
}