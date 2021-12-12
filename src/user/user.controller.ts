import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
	) { }

	@Roles(Role.ADMIN, Role.SUB_ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get('/me')
	async getMe(@Request() req) {
		const { password, ...result } = req.user;
		return result;
	}

	@Roles(Role.ADMIN, Role.SUB_ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('/:id')
	findOne(id: number) {
		return this.userService.findOne(id);
	}

	@Post('/sign-up')
	async signUp(@Body() user: CreateUserDto) {
		return await this.userService.create(user);
	}
}
