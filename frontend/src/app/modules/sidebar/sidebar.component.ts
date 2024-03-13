import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../../core/services/encryption.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  displayRole = false
  addRole = false


  constructor(private encryptionService : EncryptionService){}

  ngOnInit(): void {
    const authoritiesCrypted =localStorage.getItem('authorities') 
    const authorities =this.encryptionService.decrypt(authoritiesCrypted!,"2f7a9c81b0d4")
    if(authorities.includes("view roles" ))
    {
      this.displayRole=true
    }
    
  }


  getPrivileges()
  {
   
  }

}
