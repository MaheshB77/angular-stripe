import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [MessageService],
})
export class CreateUserComponent implements OnInit {
  userName: string = '';
  email: string = '';
  loading: boolean = false;

  constructor(
    private stripeService: StripeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  createUser() {
    try {
      this.loading = true;
      const user: User = {
        name: this.userName,
        email: this.email,
      };
      this.stripeService.createUser(user).subscribe(
        (response: any) => {
          this.showSuccess();
          console.log('Response => ', response);
        },
        (error) => {
          console.error('API error => ', error);
          this.showFailure();
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.userName = '';
          this.email = '';
        }
      );
    } catch (error) {
      console.error('Error occurred while creating user, ', error);
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User created',
      life: 3000
    });
  }
  
  showFailure() {
    this.messageService.add({
      severity: 'error',
      summary: 'Failure',
      detail: 'User creation failed',
      life: 3000
    });
  }
}
