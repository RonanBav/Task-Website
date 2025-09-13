import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, tasksListDTO, type paginationDTO } from './task-models';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  baseUrl: string = "https://localhost:7070/api/Task"
  constructor(private httpClient: HttpClient) { }

  tasksList: task[] = []



  getList(paginationDTO: paginationDTO, token: string) {
    return this.httpClient.get<tasksListDTO>(`${this.baseUrl}?page=${paginationDTO.page + 1}&maxPerPage=${paginationDTO.maxPerPage}`, { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) });
  }

  addTask(task: task) {

    const account = localStorage.getItem("account")!
    const userNameData = JSON.parse(account);
    const userName = userNameData.email



    return this.httpClient.post(this.baseUrl, { name: task.name, isCompleted: task.isCompleted, date: task.date, description: task.description, categoryId: task.categoryId, taskAuthor: userName, categoryName: "" });
  }

  getTaskById(id: number) {
    return this.httpClient.get<task>(`${this.baseUrl}/${id}`)
  }

  search(search: string) {

    return this.httpClient.get<task[]>(`${this.baseUrl}/search/?search=${search}`)
  }


  editTask(task: task, id: number) {
    const subscription = this.httpClient.put(`${this.baseUrl}/${id}`, task).subscribe(
      {
        complete: () => { subscription.unsubscribe() }
      }
    );
  }

  deleteTask(id: number) {
    const subscription = this.httpClient.delete(`${this.baseUrl}/?id=${id}`).subscribe(
      {
        complete: () => { subscription.unsubscribe() }
      }
    )
  }


}
