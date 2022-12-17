//task一覧を取得するts

import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import { Task } from "../types/types"

export const useQueryTasks = () => {
    //supabaseにフェッチ
    const getTasks = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: true })
        
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    //データ型を定義（[staleTime:Infinity]はsupabaseにフェッチを行わないようになる）
    return useQuery<Task[], Error>({
        queryKey: ['todos'],
        queryFn: getTasks,
        staleTime: Infinity,
    })
}