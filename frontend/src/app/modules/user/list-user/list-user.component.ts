import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  displayedColumns: string[] = ['firstname', 'lastname' ,'email','address','birthday','degree','Actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  ngOnInit(): void {
    this.getUsers();
    console.log(this.getUsers())
  }

  constructor(private router:Router,private usersService: UserService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(
      {
        next : (res: any)=>
        {
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => 
        {
          console.log(err);
        }
      }
    );

  }

  onEditClick(id: string) {
    
    this.router.navigate(['/users/update/'+id]);
  }
  delete(id : string)
  {
    this.usersService.deleteUser(id).subscribe(
      {
        next: (res) => 
        {
          
          this.getUsers();
        },
        error : console.log,
  
      }
    )
  
  
  }
}
