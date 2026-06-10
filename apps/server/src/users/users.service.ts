import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(skip: number, take: number, role?: string, status?: string) {
    const where: any = {};
    if (role) where.role = role;
    if (status === 'verified') where.isVerified = true;
    if (status === 'unverified') where.isVerified = false;
    if (status === 'active') where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: string;
    password?: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const password = data.password ?? crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role ? (data.role as UserRole) : UserRole.USER,
        profile: {
          create: { bio: '' },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
      },
    });
  }

  async updateUser(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      role?: string;
      isActive?: boolean;
      isVerified?: boolean;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        role: data.role ? (data.role as UserRole) : undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
