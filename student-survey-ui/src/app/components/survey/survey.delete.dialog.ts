// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-confirm-delete-dialog',
//   template: `
//     <h1 mat-dialog-title>Are you sure you want to delete this survey?</h1>
//     <div mat-dialog-actions>
//       <button mat-button (click)="dialogRef.close('cancel')">Cancel</button>
//       <button mat-button (click)="dialogRef.close('confirm')">Delete</button>
//     </div>
//   `,
// })
// export class ConfirmDeleteDialog {
//   constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>) {}
// }
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <div class="dialog-container">
      <h1 class="dialog-title">Are you sure you want to delete this survey?</h1>
      <div class="dialog-actions">
        <button class="cancel-btn" mat-button (click)="dialogRef.close('cancel')">Cancel</button>
        <button class="delete-btn" mat-button (click)="dialogRef.close('confirm')">Delete</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 320px;
      }

      .dialog-title {
        font-size: 18px;
        font-weight: bold;
        color: #006633;
        margin-bottom: 20px;
      }

      .dialog-actions {
        display: flex;
        justify-content: space-between;
      }

      .cancel-btn {
        background-color: #e0e0e0;
        color: #333;
        border-radius: 5px;
        padding: 8px 15px;
        font-weight: bold;
        transition: 0.3s;
      }

      .cancel-btn:hover {
        background-color: #d6d6d6;
      }

      .delete-btn {
        background-color: #ffcc33;
        color: black;
        border-radius: 5px;
        padding: 8px 15px;
        font-weight: bold;
        transition: 0.3s;
      }

      .delete-btn:hover {
        background-color: #ffb700;
      }
    `,
  ],
})
export class ConfirmDeleteDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>) {}
}
