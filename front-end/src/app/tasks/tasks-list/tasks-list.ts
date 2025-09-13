import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { TaskService } from '../task-service';
import { task } from '../task-models';
import { type paginationDTO } from '../task-models';
import { CompletePipePipe } from '../shared/complete-pipe-pipe';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Dialog } from '@angular/cdk/dialog';
import { TaskWindow } from '../task-window/task-window';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [ CompletePipePipe, FormsModule, MatPaginator],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css'
})
export class TasksList implements AfterViewInit {
  private taskService = inject(TaskService)
  private dialog = inject(Dialog);
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)

  tasks: task[] = []
  paginationDTO: paginationDTO = { page: 0, maxPerPage: 5 };
  search: string = "";
  count = 0;




  getList() {
    const account = localStorage.getItem("account")!;

    const subscription = this.taskService.getList(this.paginationDTO, account).subscribe(
      {
        next: (dto) => { this.tasks = dto.tasks, this.count = dto.count },
        complete: () => { subscription.unsubscribe()}
      }
    )

    return subscription
  }


  ngAfterViewInit() {
    const subscription = this.getList();
    this.destroyRef.onDestroy( () => {subscription.unsubscribe()})
  }

  onSearch() {
    if (this.search) {
      const subscription = this.taskService.search(this.search).subscribe(
        {
          next: (dtoList) => { this.tasks = dtoList }
        }
      )
    } else {
      this.getList();
    }

  }

  onPageChange(page: number, pageSize: number) {
    this.paginationDTO.page = page;
    this.paginationDTO.maxPerPage = pageSize
    this.getList();
  }

  onOpenTask(id: number) {

    const dialogRef = this.dialog.open(TaskWindow,
      {
        data: { id: id },
        height: '400px',
        width: '600px',
      }
    )

    dialogRef.closed.subscribe( () => {setTimeout(() => {this.getList()},100)})
  }

  onLogout() {
    localStorage.removeItem("account");
    this.router.navigate(["login"])
  }

}
