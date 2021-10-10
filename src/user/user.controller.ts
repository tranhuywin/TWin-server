import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private userService: UserService;

    constructor(_userService: UserService) {
      this.userService = _userService;
    }

    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
}
