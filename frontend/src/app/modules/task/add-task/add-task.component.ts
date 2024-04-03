import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/Task';
import { TaskService } from '../../../core/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  monthData: MonthData[] = [];
  tasks: Task[] = [];
  selectedDate: Date = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.generateMonthData(new Date());
    this.taskService.findAllTasks().subscribe({
      next: (data: Task[]) => {
        console.log(data);
        this.tasks = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  generateMonthData(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = new Date(year, month + 1, 0).getDate();

    const daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentMonthYear = `${monthNames[month]} ${year}`;

    const monthData: MonthData = {
      monthName: currentMonthYear,
      monthIndex: month,
      days: daysInMonth,
      tasks: this.tasks,
    };

    this.monthData.push(monthData);
  }

  switchMonth(delta: number) {
    this.monthData = [];
    this.selectedDate.setMonth(this.selectedDate.getMonth() + delta);
    this.generateMonthData(this.selectedDate);
  }

  updateTaskStatus(task: Task, day: number) {
    console.log('Clicked day:', day);
    // Implement task status update logic here
  }

  openUpdateModal(task: Task, day: number): void {
    // Implement logic to open modal for task update
  }

  handleUpdate(task: Task, day: number) {
    console.log('Clicked day:', day);
    // Implement logic to handle task update
  }
}

interface MonthData {
  monthName: string;
  monthIndex: number;
  days: number[];
  tasks: Task[];
}

