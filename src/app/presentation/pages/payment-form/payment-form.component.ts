import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMask } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RequestCheckout } from '../../../domain/model/payment.model';
import { PaymentApiService } from '../../../domain/api/services/payment.api.service';

@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputMask,
    DividerModule,
    InputNumber,
    Select,
    FloatLabel,
    ButtonModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent {
  paymentOptions = [
    { name: 'PIX', value: 'pix' },
    { name: 'Cartão de Crédito', value: 'credit_card' },
  ];

  formPayment = new FormGroup({
    customer: new FormGroup(
      {
        name: new FormControl('', { nonNullable: true }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.email],
        }),
        document: new FormControl('', {
          nonNullable: true,
          validators: [Validators.maxLength(14), Validators.minLength(14)],
        }),
        phone: new FormGroup({
          country: new FormControl('', { nonNullable: true }),
          area: new FormControl(0, {
            nonNullable: true,
            validators: [Validators.min(1)],
          }),
          number: new FormControl(0, {
            nonNullable: true,
            validators: [Validators.maxLength(9)],
          }),
        }),
      },
      { validators: [Validators.required] }
    ),
    paymentMethod: new FormControl(this.paymentOptions[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    item: new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      quantity: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      unitAmount: new FormControl(
        { value: 132.5, disabled: true },
        { nonNullable: true }
      ),
      imageUrl: new FormControl(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRselD0aDs9IxLtQluv06huCLuy9-mYl2pEXQ&s',
        { nonNullable: true }
      ),
    }),
  });

  constructor(private paymentApiService: PaymentApiService) {}

  onSubmit() {
    const formValues = this.formPayment.getRawValue();

    const normalizedValues: RequestCheckout = {
      customer: {
        ...formValues.customer,
        phone: {
          ...formValues.customer.phone,
          country: this.ensureCountryPrefix(formValues.customer.phone.country),
        },
      },
      paymentMethod: formValues.paymentMethod.value,
      items: [{ ...formValues.item }],
    };

    console.log(normalizedValues);

    this.paymentApiService.sendCheckout(normalizedValues).subscribe({
      next: (res) => {
        window.open(res.href, '_blank');

        console.log('Deu certo! ', res);
      },
      error: (err) => {
        console.error('Deu erro... ', err);
      },
      complete: () => {
        console.log('Completou.');
      },
    });
  }

  private ensureCountryPrefix(country: string): string {
    return country.startsWith('+') ? country : `+${country}`;
  }
}
