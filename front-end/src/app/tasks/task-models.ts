
export interface paginationDTO {
    page: number,
    maxPerPage: number
}

export interface tasksListDTO {
    count: number,
    tasks: task[]
}

export interface task {
    id: number,
    name: string,
    isCompleted: boolean,
    date: string,
    description: string,
    categoryId: number,
    categoryName: string
}