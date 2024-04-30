import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RecruitementAssistantService } from '../../core/services/recruitementAssistant.service';

@Component({
  selector: 'app-recruitement-assistant',
  templateUrl: './recruitement-assistant.component.html',
  styleUrl: './recruitement-assistant.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitementAssistantComponent {
  @ViewChild('chatBox') chatBox!: ElementRef<HTMLInputElement>;
  isOpen: boolean = false;
  chatmessage!: string;
  newMessage: string = '';
  messages: any[] = [];
  isResponding: boolean = false; // Variable to indicate if system is responding

  constructor(
    private chatService: RecruitementAssistantService,
    private cdr: ChangeDetectorRef
  ) {}
  toggleChat() {
    const chatSection = document.getElementById('chat1');
    if (chatSection) {
      chatSection.classList.toggle('chat-hidden');
    } else {
      console.error('Chat section not found.');
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }
    this.messages.push({ name: 'User', message: this.newMessage });
    this.chatService.sendMessage(this.newMessage).subscribe(
      (response) => {
        this.messages.push({ name: 'Sam', message: response.answer });
        this.newMessage = '';
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
