import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators/public.decorator';
import { CvassistantService } from './cvassistant.service';
import { ResumeService } from './resume/resume.service';

@Controller('cvassistant')
export class CvassistantController {
    constructor(private cvassistantService: CvassistantService, private resumeService : ResumeService){}




    @Public()
    @Post("sendMessage/:threadId")
    sendMesage(@Body() body: any  ,@Param('threadId') threadId: string)
    {
       return this.cvassistantService.sendMesage(body.message,threadId)
    }

    @Public()
    @Get()
    createNewThread()
    {
      return this.cvassistantService.createNewThread(); 
    }
    @Public()
    @Get("cv")
    generateCv()
    { return this.resumeService.processTextToPdfAndUpload(`John Doe

    123 Your Street, City, State, Zip Code
    
    Phone: (123) 456-7890 | Email: johndoe@example.com | LinkedIn: linkedin.com/in/johndoe
    
    Professional Summary
    Dedicated and results-oriented professional with over 10 years of experience in project management and software development. Proven track record of delivering complex projects on time and within budget. Strong leadership skills with a focus on team collaboration and achieving business goals.
    
    Work Experience
    Senior Project Manager
    ABC Technology, New York, NY
    March 2016 - Present
    
    Lead a team of 10 software developers to deliver high-quality software solutions that meet client requirements.
    Manage project timelines, budgets, and resource allocation.
    Foster client relationships, ensuring high satisfaction and repeat business.
    Implemented process improvements that increased team productivity by 20%.
    Project Coordinator
    XYZ Innovations, Los Angeles, CA
    June 2010 - February 2016
    
    Assisted project managers in the coordination of project phases and milestones.
    Prepared comprehensive reports on project status and outcomes.
    Coordinated with cross-functional teams to ensure timely delivery of project deliverables.
    Contributed to the successful delivery of a flagship project that resulted in a 25% increase in company revenue.
    Education
    Master of Science in Project Management
    University of California, Los Angeles
    2010
    
    Bachelor of Science in Computer Science
    University of California, Berkeley
    2008
    
    Certifications
    Certified Project Management Professional (PMP), Project Management Institute
    Certified Scrum Master (CSM), Scrum Alliance
    Skills
    Project Management
    Agile and Scrum Methodologies
    Budget Management
    Team Leadership
    Risk Management
    Client Relationship Management
    Software Development Lifecycle (SDLC)
    Languages
    English (Native)
    Spanish (Fluent)
    Professional Affiliations
    Member, Project Management Institute (PMI)
    Member, Scrum Alliance
    Publications
    Doe, J. (2019). "Efficiency in Project Management," Project Management Journal.
    References
    Available upon request.
    
    `)

    }

    

}
