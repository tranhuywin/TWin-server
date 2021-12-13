import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("user")
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
	findOne(@Param('id') id: number) {
		return this.userService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch()
	update(@Request() req, @Body() userUpdateDto: UpdateUserDto) {
		return this.userService.update(req.user.id, userUpdateDto)
	}

	@Roles(Role.ADMIN, Role.SUB_ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('/:id')
	delete(@Param('id') id: number) {
		return this.userService.delete(id);
	 }

	@Post('/register')
	async register(@Body() user: CreateUserDto) {
		return await this.userService.create(user);
	}
}
