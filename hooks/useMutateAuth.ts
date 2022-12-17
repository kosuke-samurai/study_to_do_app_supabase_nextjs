import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useMutation } from "react-query";

export const useMutateAuth = () => {
    //カスタムhooks。eメールとパスワードで認証させたい場合
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const reset = () => {
        setEmail('')
        setPassword('')
    }

    //ログインボタンを押した際に発火する関数
    const loginMutation = useMutation(
       async () => {
            const { error } = await supabase.auth.signIn({ email, password })
            if(error)throw new Error(error.message)
        },
        {
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )

    //ユーザー新規登録の際の関数
    const registerMutation = useMutation(
       async () => {
            const { error } = await supabase.auth.signUp({ email, password })
            if(error)throw new Error(error.message)
        },
        {
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )
    return {
        email,
        setEmail,
        password,
        setPassword,
        loginMutation,
        registerMutation,
    }
}