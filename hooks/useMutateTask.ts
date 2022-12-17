import { useQueryClient, useMutation } from "react-query";
import useStore from "../store";
import { supabase } from "../utils/supabase";
import { Task, EditedTask } from '../types/types';

export const useMutateTask = () => {
    const queryClient = useQueryClient()
    const reset = useStore((state) => state.resetEditedTask)
    
    //タスクを新規作成する用
    const createTaskMutation = useMutation(
        async (task: Omit<Task, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('todos')
                .insert(task)
            
            if (error) throw new Error(error.message)
            return data          
    },
        {
            onSuccess: (res) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
                if (previousTodos) {
                    queryClient.setQueryData(['todos'], [...previousTodos, res[0]])
                }
                reset()
            },
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    
    )

    //タスクを更新する用
    const updateTaskMutation = useMutation(async (task: EditedTask) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ title: task.title })
            //どのアイテムに更新をかけるのか指定している↓
            .eq('id', task.id)
        if (error) throw new Error(error.message)
        return data
    }, {
        onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
                if (previousTodos) {
                    queryClient.setQueryData(
                        ['todos'],
                        previousTodos.map((task) =>
                    task.id === variables.id ? res[0] : task))
                }
                reset()
            },
        onError: (err: any) => {
                alert(err.message)
                reset()
            },
    })

    //タスクの削除
    const deleteTaskMutation = useMutation(
        async (id: string) => {
            const { data, error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id)
            
            if (error) throw new Error(error.message)
            return data   
        },
        {
        onSuccess: (_, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['todos'])
                if (previousTodos) {
                    queryClient.setQueryData(
                        ['todos'],
                        previousTodos.filter((task) => task.id !== variables)
                    )}
                reset()
            },
        onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )

    return {createTaskMutation, updateTaskMutation,deleteTaskMutation }
}