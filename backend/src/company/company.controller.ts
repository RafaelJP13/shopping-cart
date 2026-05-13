import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import type { UpdateCompanyDTO } from './dto/update-company.dto';
import type { CreateCompanyDTO } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Post()
    async create(@Body() body: CreateCompanyDTO) {
        return this.companyService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateCompanyDTO,
    ) {
        console.log(id, body);
        return this.companyService.update(
            id,
            body,
        );
    }
}