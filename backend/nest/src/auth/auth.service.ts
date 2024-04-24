import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as Twilio from 'twilio';

@Injectable()
export class AuthService {
 
    private readonly client: Twilio.Twilio
  
  constructor(
    private prisma: PrismaService,
    private jwtService : JwtService,
    
  ) {
    this.client = Twilio("AC2398e2497d77b98accc6f7cbed706229", "3364a777558b382b95f31835e206353a");
  }

   generateSixDigitCode(): string {
    const min = 100000; 
    const max = 999999; 
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
    } 

    async verifyCode(code: string, email: string) {
      const verificationCode = await this.prisma.verificationCode.findFirst(
        {
            where : {
                code : code,
                email : email
            }
        }
       );
       if(!verificationCode)
        {
            throw new NotFoundException('Code not found');
        }
        if ( new Date(verificationCode.expiryDate) < new Date()) {
            throw new BadRequestException(' Code has expired');
          }
          await this.deleteCode(email);
          //success

          const  user = await this.prisma.user.findUnique(
            {
                where : {
                    email : email
                }
            }
        )
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateAtHash(user.id, tokens.access_token);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
          

      }

    async deleteCode(email:string)
    {
        await this.prisma.verificationCode.deleteMany(
            {
                where : {
                    email : email
                }
            }
        )
    }
    async sendsmscode(email: string) {
        try {
            await this.deleteCode(email);
            const code =this.generateSixDigitCode();
            const user = await this.prisma.user.findUnique({
                where: {
                  email: email,
                },
                select: {
                    number: true,
                    email : true,
                }
              });
            const number = "+216"+user.number.toString()
            await this.client.messages.create({
              body: "Your verification code  "+code,
              from: "+12563226071", 
              to : number
            });
            const expiryDate = new Date();
            
            expiryDate.setMinutes(expiryDate.getMinutes() + 2);
            const expiryDateString = expiryDate.toISOString();
            await this.prisma.verificationCode.create({
                data : {
                    email: email,
                    code : code,
                    expiryDate: expiryDateString
                }
            })
            return "code sent with success"
          } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error('Failed to send SMS');
          }
    
  }

  async signupLocal(dto : AuthDto) : Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
        data : {
            email: dto.email,
            hash, 
        },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateAtHash(newUser.id, tokens.access_token);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }




  async signinLocal(dto : AuthDto) : Promise<Tokens> {
    const  user = await this.prisma.user.findUnique(
        {
            where : {
                email : dto.email
            }
        }
    )
    
    if(!user) throw new ForbiddenException("Access Denied")
    const passwordMatches = await bcrypt.compare(dto.password, user.hash)
    if(!passwordMatches) throw new ForbiddenException("Access Denied")

        //2fa ***
    if(user.smsEnabled)
        {
            const tokens ={ access_token: "sms", refresh_token: "sms"}
            return tokens
        }


    const tokens = await this.getTokens(user.id, user.email);
    await this.updateAtHash(user.id, tokens.access_token);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;

  }

  async logout(userId : string ){
    await this.prisma.user.updateMany({
        where : {
            id : userId,
            hashedRt : {
                not : null,
            },
        },
        data : {
            hashedRt : null,
            hashedAt : null
        }
    })
  }




  async updateRtHash(userId : string, rt : string )
  {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
        where : {
            id : userId,
        },
        data : {
            hashedRt : hash,
        },
    });
  }
  async updateAtHash(userId : string, at : string )
  {
    const hash = await this.hashData(at);
    await this.prisma.user.update({
        where : {
            id : userId,
        },
        data : {
            hashedAt : hash,
        },
    });
  }

  async refreshTokens(userId : string , rt : string){
    const user =  await this.prisma.user.findUnique({
        where : {
            id : userId
        }
    })
    if(!user) throw new ForbiddenException("Access Denied")
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if(!rtMatches) throw new ForbiddenException("Access Denied")

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
    

}



hashData(data : string) {
    return bcrypt.hash(data, 10);
  }


  async getTokens(userId : string, email : string){
    const [at , rt ] = await Promise.all([
        this.jwtService.signAsync({
            sub : userId,
            email,
        }, {
            secret : 'at-secret',
            expiresIn : 60 * 120,
        }),

        this.jwtService.signAsync({
            sub : userId,
            email,
        }, {
            secret : 'rt-secret',
            expiresIn : 60 * 60 * 24 * 7,
        })


    ])
    return {
        access_token : at,
        refresh_token : rt
    }

  }

}
