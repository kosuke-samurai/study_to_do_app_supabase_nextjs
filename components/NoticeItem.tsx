import { FC, useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import useStore from "../store"
import { useMutateNotice } from "../hooks/useMutateNotice"
import { Notice } from "../types/types"

import { PencilAltIcon,TrashIcon } from "@heroicons/react/solid"

export const NoticeItem: FC<Omit<Notice, 'created_at'>> = ({
    id,
    content,
    user_id
}) => {
    const [userID, setUserID] = useState<string | undefined>('')
    const update = useStore((state) => state.updateEditedNotice)
    const { deleteNoticeMutation } = useMutateNotice()
  
    useEffect(() => {
        setUserID(supabase.auth.user()?.id)
    }, [])
    
  return (
      <li className="my-3 text-lg font-extrabold">
          <span>{content}</span>

          {/* 出し分け：ユーズエフェクトで評価した現在ログインしているユーザIDとpropsで渡されてきたIDが一致したときだけアイコン表示 */}
          {userID === user_id && (
        <div className="float-right ml-20 flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id: id,
              content: content,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteNoticeMutation.mutate(id)
          }}
        />
      </div>
          )}


    </li>
  )
}
