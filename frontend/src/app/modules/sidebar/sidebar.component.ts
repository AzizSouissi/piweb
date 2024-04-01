import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../../core/services/encryption.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  displayRoleList = false
  displayRoleAdd = false
  displayUserList = false
  displayUserAdd = false

  addRole = false


  constructor(private encryptionService : EncryptionService){}

  ngOnInit(): void {
    const authoritiesCrypted =localStorage.getItem('authorities') 
    const authorities =this.encryptionService.decrypt(authoritiesCrypted!,"2f7a9c81b0d4")
    if(authorities.includes("READ::ROLE" ))
    {
      this.displayRoleList=true
    }
    if(authorities.includes("ADD::ROLE" ))
    {
      this.displayRoleAdd=true
    }
    if(authorities.includes("READ::USER" ))
    {
      this.displayUserList=true
    }
    if(authorities.includes("ADD::USER" ))
    {
      this.displayUserAdd=true
    }
    
  }


  getPrivileges()
  {
   
  }

}
