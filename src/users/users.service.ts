import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    
    async getAllUsers(){
        const allUsers = await this.userModel.find();

        return allUsers;
    }

    async findUserById(user_id: string){
        const existingUser = await this.userModel.findOne({user_id: user_id});

        return existingUser;
    }

    async registerUser(user: User){
        user.user_id = user.user_id.toUpperCase();

        const existingUser = await this.findUserById(user.user_id);

        if(existingUser){
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        }

        const currentDate = new Date();
        user.createdDate = currentDate;
        user.updatedDate = currentDate;

        const newUser = new this.userModel(user);

        const savedUser = await newUser.save();

        return savedUser;
    }


    async verifyUser(email: string, user_id: string){
        const existingUser = await this.findUserById(user_id);
        let isVerified = false;

        if(!existingUser){
            isVerified = false;
        }else if(existingUser.email !== email){
            isVerified = false;
        }else if((existingUser.email === email) && (existingUser.user_id === user_id)){
            isVerified = true;
        }

        return {isVerified: isVerified}
    }
}
