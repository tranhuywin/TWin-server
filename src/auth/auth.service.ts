import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) { }

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findOneByEmail(email);
		const isMatch = await bcrypt.compare(password, user.password);
		
		if (user && isMatch) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async validateUserById(id: number) {
		const user = await this.userService.findOne(id);
		return user;
	}

	async validateUserEmail(email: string) {
		const user = await this.userService.findOneByEmail(email);
		return user;
	  }

	async login(user: any) {
		const payload = { 
			email: user.email,
			id: user.id, 
			firstName: user.firstName, 
			lastName: user.lastName,
			role: user.typeRole,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

}