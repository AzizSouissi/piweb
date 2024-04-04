import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ProjectManagementService } from '../../../core/services/projectManagement.service'; // Assuming ProjectManagementService is imported
import { Project, ProjectStatus } from '../../../core/models/project';

@Component({
  selector: 'app-ListProjects',
  templateUrl: './ListProjects.component.html',
  styleUrls: ['./ListProjects.component.css'],
})
export class ListProjectsComponent implements OnInit {
  projects!: Project[];
  todo!: Project[];
  done!: Project[];
  finished!: Project[];
  numProjectsTodo!: number;
  numProjectsDone!: number;
  numProjectsFinished!: number;

  constructor(private projectService: ProjectManagementService) {}
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((allProjects) => {
      this.projects = allProjects;
      this.todo = this.projects.filter(
        (project) => project.projectStatus === 'ON_HOLD'
      );
      this.done = this.projects.filter(
        (project) => project.projectStatus === 'RUNNING'
      );
      this.finished = this.projects.filter(
        (project) => project.projectStatus === 'FINISHED'
      );
    });
    this.numProjectsTodo = this.todo.length;
    this.numProjectsDone = this.done.length;
    this.numProjectsFinished = this.finished.length;
  }
  handleDrop(event: CdkDragDrop<Project[]>, newStatus: string) {
    const newK = this.stringToProjectStatus(newStatus);
    this.drop(event, newK);
  }
  stringToProjectStatus(statusString: string): ProjectStatus {
    switch (statusString) {
      case 'ON_HOLD':
        return ProjectStatus.ON_HOLD;
      case 'RUNNING':
        return ProjectStatus.RUNNING;
      case 'FINISHED':
        return ProjectStatus.FINISHED;
      default:
        throw new Error(`Invalid project status: ${statusString}`);
    }
  }
  drop(event: CdkDragDrop<Project[]>, newStatus: ProjectStatus) {
    console.log('jjznakjznkajznza', newStatus);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedProject: Project =
        event.previousContainer.data[event.previousIndex];
      if (movedProject && movedProject.id) {
        console.log('id ta3 il project', movedProject.id);
        movedProject.projectStatus = newStatus;
        const updateDto: Project = {
          name: movedProject.name,
          description: movedProject.description,
          projectStatus: newStatus,
          usersIds: movedProject.usersIds,
          leader: movedProject.leader,
          startDate: movedProject.startDate,
          endDate: movedProject.endDate,
        };
        this.projectService
          .updateProject(movedProject.id, updateDto)
          .subscribe(() => {
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex
            );
            console.log('successfully');
          });
      } else {
        console.error('Error: Project or project id is undefined');
      }
    }
  }
}
