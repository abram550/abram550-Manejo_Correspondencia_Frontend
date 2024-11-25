import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-employees', // Component selector to be used in the HTML template
  standalone: true, // Indicates that this is a standalone component (doesn't require a module)
  imports: [], // No additional imports required
  templateUrl: './delete-employees.component.html', // Path to the HTML template for this component
  styleUrls: ['./delete-employees.component.css'] // Path to the CSS styles for this component
})
export class DeleteEmployeesComponent {
  // This component currently does not have any logic or properties defined.
}
