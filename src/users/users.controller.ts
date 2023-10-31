import { Controller, Post, Get, Body, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserVerification } from './dtos/users.dto';
import { 
    ApiCreatedResponse, 
    ApiBadRequestResponse, 
    ApiOkResponse, 
    ApiTags, 
    ApiBody, ApiOperation, ApiResponse, ApiQuery
  } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @ApiOperation({ summary: 'Get all users' }) // Summary for the endpoint
    @ApiResponse({ status: 200, description: 'Return a list of all users' }) // Response description
    async allUser() {
      const all_users = await this.usersService.getAllUsers();
      return all_users;
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user by ID' })
    @ApiQuery({ name: 'id', type: String, description: 'User ID' }) // Query parameter documentation
    async getUserById(@Query('id') user_id: string) {
      const user = await this.usersService.findUserById(user_id);
      return user;
    }
  
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'Return the newly created user' })
    @ApiBody({ type: User, description: 'User to be created' })
    @ApiCreatedResponse({ type: User, description: 'User created' })
    @Post('create')
    @UsePipes(new ValidationPipe())
    async addUser(@Body() userBody: User) {
      const added_user = await this.usersService.registerUser(userBody);
      return added_user;
    }
  
    @Post('verify')
    @ApiOperation({ summary: 'Verify a user' })
    @ApiResponse({ status: 200, description: 'Return true if user is verified, false otherwise' })
    @ApiBody({ 
        description: 'Provide the email and user ID for verification',
        type: UserVerification
      })
    @UsePipes(new ValidationPipe())
    async verification(
      @Body() verificationDetails: UserVerification
    ) {
      const isVerified = await this.usersService.verifyUser(verificationDetails.email, verificationDetails.user_id);

      return isVerified;
    }
}
