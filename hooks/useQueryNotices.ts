//notice一覧を取得するts

import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import { Notice } from "../types/types"

export const useQueryNotices = () => {
    //supabaseにフェッチ
    const getNotices = async () => {
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('created_at', { ascending: true })
        
        if (error) {
            throw new Error(`${error.message}: ${error.details}`)
        }
        return data
    }
    //データ型を定義（[staleTime:Infinity]はsupabaseにフェッチを行わないようになる）
    return useQuery<Notice[], Error>({
        queryKey: ['notices'],
        queryFn: getNotices,
        // 他のユーザーがnoticeは新しい投稿をするかもしれないので↓
        staleTime: 0,
        refetchOnWindowFocus: true,
    })
}