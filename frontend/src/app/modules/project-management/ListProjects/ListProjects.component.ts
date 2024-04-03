import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Project } from '../../../core/models/project';
import { ProjectManagementService } from '../../../core/services/projectManagement.service';

@Component({
  selector: 'app-ListProjects',
  templateUrl: './ListProjects.component.html',
  styleUrls: ['./ListProjects.component.css'],
})
export class ListProjectsComponent implements OnInit {
  projects!: Project[];
  status = ['RUNNING', 'ON_HOLD', 'COMPLETED'];

  constructor(private projectService: ProjectManagementService) {}

  ngOnInit() {
    this.projectService.getAllProjects().subscribe((allProjects) => {
      this.projects = allProjects;
    });
  }

  todo = [this.projects];

  done = this.projects;

  drop(event: CdkDragDrop<Project[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  onProjectsReady(projects: Project[]): void {
    this.projects = projects;
    console.log('Projects received in Component1:', this.projects);
  }
}
