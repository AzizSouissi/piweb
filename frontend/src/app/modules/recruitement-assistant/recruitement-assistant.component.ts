import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RecruitementAssistantService } from '../../core/services/recruitementAssistant.service';
import { BehaviorSubject, Observable, scan } from 'rxjs';
import { map } from 'rxjs';

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
  inputMessages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  messages$!: Observable<any[]>;
  isResponding: boolean = false; // Variable to indicate if system is responding
  inputMessages: string[] = [];
  responseMessages: string[] = [];
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

  /*sendMessage(): void {
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
  }*/
  /*sendMessage(): void {
    this.messages$ = this.messages$.pipe(
      map((messages: any[]) => [
        ...messages,
        { name: 'User', message: this.newMessage },
      ])
    );
    // Send the new message to the service
    this.chatService.sendMessage(this.newMessage).subscribe(
      (response: any) => {
        if (!this.messages$) {
          this.messages$ = new Observable<any[]>((observer) => {
            observer.next([]);
          });
        }

        this.messages$ = this.messages$.pipe(
          map((messages: any[]) => [
            ...messages,
            { name: 'User', message: this.newMessage }, // Add user message

            { name: 'Sam', message: response.answer },
          ])
        );
        this.newMessage = '';

        // Trigger change detection
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }*/

  /*sendMessage(): void {
    // Add the user message to the messages$ observable
    this.messages$ = this.messages$.pipe(
      scan(
        (messages: any[], newMessage: any) => [
          ...messages,
          { name: 'User', message: this.newMessage },
        ],
        []
      )
    );

    // Send the new message to the service
    this.chatService.sendMessage(this.newMessage).subscribe(
      (response: any) => {
        // Update messages$ with the system response
        this.messages$ = this.messages$.pipe(
          scan(
            (messages: any[], newMessage: any) => [
              ...messages,
              { name: 'Sam', message: response.answer },
            ],
            []
          )
        );
        this.newMessage = '';

        // Trigger change detection
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }*/
  async sendMessage() {
    // Add the input message to the inputMessages list
    this.inputMessages.push(this.newMessage);

    // Trigger change detection

    // Simulate sending the message and receiving a response
    try {
      const data = await this.chatService
        .sendMessage(this.newMessage)
        .toPromise();
      console.log(data.answer);
      this.responseMessages.push(data.answer);
      this.newMessage = '';

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  /* async sendMessage() {
    // Add the input message to the inputMessages list
    const currentMessages = this.inputMessages$.value;
    this.inputMessages$.next([...currentMessages, this.newMessage]);

    // Simulate sending the message and receiving a response
    try {
      const data = await this.chatService
        .sendMessage(this.newMessage)
        .toPromise();
      console.log(data.answer);
      this.responseMessages.push(data.answer);
    } catch (error) {
      console.error('Error:', error);
    }
  }*/
}
