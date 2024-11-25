import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CorrespondenceTypeService } from '../../../services/correspondence-type/correspondence-type.service';

@Component({
  selector: 'app-update-correspondence-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-correspondence-type.component.html',
  styleUrls: ['./update-correspondence-type.component.css']
})
export class UpdateCorrespondenceTypeComponent implements OnInit { 

  public form: FormGroup;
  correspondenceTypeService = inject(CorrespondenceTypeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  existingTypes: CorrespondenceTypeI[] = [];
  errorMessage: string = '';
  id: number = 0; // Correspondence type ID

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type: ['', [Validators.required]] // Removed 'newType' field
    });
  }

  ngOnInit(): void {
    // Get the ID from the URL and load the correspondence type
    this.id = this.route.snapshot.params['id'];
    this.getCorrespondenceType(this.id);
    this.fetchExistingTypes();
    this.onTypeChange();
  }

  fetchExistingTypes(): void {
    this.correspondenceTypeService.getAllTypes().subscribe(
      response => {
        this.existingTypes = response.types;
      },
      error => {
        console.error('Error loading existing types', error);
      }
    );
  }

  // Fetch the correspondence type data and populate the form
  getCorrespondenceType(id: number) {
    this.correspondenceTypeService.getOneType(id).subscribe(
      response => {
        const type = response.type; // Get the correspondence type
        this.form.patchValue({
          type: type.type
        });
      },
      error => {
        console.error('Error loading the correspondence type', error);
      }
    );
  }

  onTypeChange(): void {
    this.form.get('type')?.valueChanges.subscribe(value => {
      const typeControl = this.form.get('type');

      const existingType = this.existingTypes.find(type => type.type.toLowerCase() === value.toLowerCase());
      if (existingType) {
        this.errorMessage = 'This correspondence type already exists. Please enter a new one.';
      } else {
        this.errorMessage = ''; 
      }
    });
  }

  onSubmit(): void {
    const formValue: CorrespondenceTypeI = this.form.value;

    // Check if the type already exists
    const existingType = this.existingTypes.find(type => type.type.toLowerCase() === formValue.type.toLowerCase());

    if (existingType) {
      this.errorMessage = 'The correspondence type already exists. Please enter a new type.';
      return;
    }

    this.correspondenceTypeService.updateType(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('correspondence-type'); 
      },
      err => {
        console.log('Error updating correspondence type', err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/correspondence-type'); 
  }

  get type() { return this.form.get('type'); }
}
