import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskService } from '../task-service';
import { type task } from '../task-models';
import { Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-window',
  imports: [FormsModule],
  providers: [DatePipe],
  templateUrl: './task-window.html',
  styleUrl: './task-window.css'
})
export class TaskWindow implements OnInit {

  private taskService = inject(TaskService)
  private dialogRef = inject(DialogRef)
  private datePipe = inject(DatePipe)
  private destroyRef = inject(DestroyRef)

  task: task = {
    id: 0,
    name: '',
    isCompleted: false,
    date: this.datePipe.transform(Date.now(), "yyyy-mm-dd")!,
    description: '',
    categoryId: 1,
    categoryName: ''
  }


  title: string = "";
  isEditing: boolean = false;

  id: number = 0;




  constructor(@Inject(DIALOG_DATA) private data: { id: number }) {
    this.id = data.id
  }


  onClose() {
    this.dialogRef.close()

  }

  ngOnInit(): void {
    if (this.id && this.id != 0) {
      const subscription = this.taskService.getTaskById(this.id).subscribe(
        {
          next: (task) => {
            this.task = task
          },
          complete: () => { this.title = this.task.name; this.isEditing = true; },
        }
      )
      this.destroyRef.onDestroy(() => {subscription.unsubscribe()}) 
    } else {
      this.title = "Add a Task"
    }


  }

  onSubmit(formRef: NgForm) {
    if (formRef.valid) {
      const formattedDateString = this.datePipe.transform(this.task.date, 'yyyy-MM-dd');


      if (formattedDateString) {
        this.task.date = formattedDateString;

      }
      if (this.id && this.id > 0) {
        this.taskService.editTask(this.task, this.id);
      } else {

        const subscription = this.taskService.addTask(this.task).subscribe(
          {
            complete: () => {subscription.unsubscribe()}
          }
        )
      }
      this.onClose();
    }

  }

  onDelete() {
    if (this.isEditing && confirm(`Are you sure you want to delete ${this.task.name}`)) {
      this.taskService.deleteTask(this.id)
      this.onClose();
    }
  }

  onDatePicker(event: any) {
     event.target.showPicker();
  }
}
