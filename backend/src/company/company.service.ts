// company.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

import { CreateCompanyDTO } from "./dto/create-company-dto";

@Injectable()
export class CompanyService {
    constructor(
        private prisma: PrismaService
    ) { }

    async findAll() {
        return this.prisma.company.findMany();
    }

    async create(data: CreateCompanyDTO) {
        return this.prisma.company.create({
            data: {
                adminName: data.adminName,
                adminEmail: data.adminEmail,

                representante:
                    data.representante,

                fantasyName:
                    data.fantasyName,

                legalName:
                    data.legalName,

                cnpj: data.cnpj,

                cnpj_status:
                    data.cnpj_status,

                phone: data.phone,

                cep: data.cep,

                state: data.state,

                city: data.city,

                address: data.address,
            },
        });
    }

    async findOne(id: string) {
        const company = await this.prisma.company.findUnique({
            where: {
                id,
            },
        });

        if (!company) {
            throw new NotFoundException('Empresa não encontrada');
        }

        return company;
    }
}