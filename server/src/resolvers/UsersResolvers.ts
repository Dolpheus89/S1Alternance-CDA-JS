import { Query, Resolver, Arg, Mutation } from "type-graphql"
import { dsc } from "../utils/db"
import { Equal } from "typeorm"
import { User } from "../entities/User"
import * as argon2 from 'argon2'
import jwt from "jsonwebtoken"


@Resolver(User)
export class UserResolvers {
    private userRepository = dsc.getRepository(User)

    @Query((type) => [User])
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

    @Query((type) => [User])
    async getUserById(@Arg("id") id: number): Promise<User[]> {
        return await this.userRepository.findBy({
            id: Equal(id),
        })
    }

    @Mutation(_ => User)
    async createUser(@Arg("email") email : string, @Arg("password") password: string, @Arg("role") role : string) : Promise<User> {

        const hashPassword :string = await argon2.hash(password)
        const user = new User(email,role, hashPassword)
        await this.userRepository.save(user)

        return user
    }

    @Query(type => String)
    async login(@Arg("email") email: string, @Arg("password") password: string) : Promise<string> {
        console.log("login attempt: " + email);

        const user : User = await this.userRepository.findOneOrFail({
            where: {
                email
            }
        })
        
        const isValid: boolean = await argon2.verify(user.passwordHashed,password)

        if(!isValid){
            throw new Error('email or password is incorrect')
        }

        const jwtSecret: string | undefined = process.env.JWT_SECRET

        if(!jwtSecret) {
            throw new Error('invalid JWT secret')
        }

        const token: string = jwt.sign({email, role: user.role}, jwtSecret)
        
        return token
    }


}
