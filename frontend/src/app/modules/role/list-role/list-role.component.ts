import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent implements OnInit{
  displayedColumns: string[] = ['Role', 'Privileges' ,'Actions'];
  dataSource!: MatTableDataSource<any>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getRoles();
  }
 constructor(private router:Router,private roleService: RoleService){}

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

 getRoles() {
  this.roleService.getRoles().subscribe(
    {
      next : (res)=>
      {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => 
      {
        console.log(err);
      }
    }
  );
}

onEditClick(id: string) {
    
  this.router.navigate(['/roles/update/'+id]);
}
delete(id : string)
{
  this.roleService.deleteRole(id).subscribe(
    {
      next: (res) => 
      {
        
        this.getRoles();
      },
      error : console.log,

    }
  )


}



  


}
