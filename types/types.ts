//テーブルのデータ型


export type Task = {
    id: string
    created_at: string
    title: string
    user_id:string | undefined
}

export type Notice = {
    id: string
    created_at: string
    content: string
    user_id:string | undefined
}

//編集中のデータタイプ(omit＝取り除くという意味。TASKからcreated_atとuser_idを取り除いている)
export type EditedTask = Omit<Task, 'created_at' | 'user_id'>
export type EditedNotice = Omit<Notice, 'created_at' | 'user_id'>