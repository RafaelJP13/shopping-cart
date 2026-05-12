import { Body, Controller, Get, Post } from '@nestjs/common';
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
}