import { useQueryClient, useMutation } from "react-query";
import useStore from "../store";
import { supabase } from "../utils/supabase";
import { Notice, EditedNotice } from '../types/types';

export const useMutateNotice = () => {
    const queryClient = useQueryClient()
    const reset = useStore((state) => state.resetEditedNotice)
    
    //Noticeを新規作成する用
    const createNoticeMutation = useMutation(
        async (notice: Omit<Notice, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('notices')
                .insert(notice)
            
            if (error) throw new Error(error.message)
            return data          
    },
        {
            onSuccess: (res) => {
                const previousNotices = queryClient.getQueryData<Notice[]>(['notice'])
                if (previousNotices) {
                    queryClient.setQueryData(['notice'], [...previousNotices, res[0]])
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
    const updateNoticeMutation = useMutation(async (notice: EditedNotice) => {
        const { data, error } = await supabase
            .from('notices')
            .update({ content: notice.content })
            //どのアイテムに更新をかけるのか指定している↓
            .eq('id', notice.id)
        if (error) throw new Error(error.message)
        return data        
    }, {
        onSuccess: (res, variables) => {
                const previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
                if (previousNotices) {
                    queryClient.setQueryData(
                        ['notices'],
                        previousNotices.map((notice) =>
                    notice.id === variables.id ? res[0] : notice))
                }
                reset()
            },
        onError: (err: any) => {
                alert(err.message)
                reset()
            },
    })

    //タスクの削除
    const deleteNoticeMutation = useMutation(
        async (id: string) => {
            const { data, error } = await supabase
                .from('notices')
                .delete()
                .eq('id', id)
            
            if (error) throw new Error(error.message)
            return data   
        },
        {
        onSuccess: (_, variables) => {
                const previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
                if (previousNotices) {
                    queryClient.setQueryData(
                        ['notices'],
                        previousNotices.filter((notice) => notice.id !== variables)
                    )}
                reset()
            },
        onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )

    return {createNoticeMutation, updateNoticeMutation,deleteNoticeMutation }
}