import { NextPage } from "next"
import { supabase } from "../utils/supabase"
import { Layout } from "../components/Layout"

import { LogoutIcon,StatusOnlineIcon,DocumentTextIcon } from "@heroicons/react/solid"

import { TaskList } from "../components/TaskList"
import { TaskForm } from "../components/TaskForm"
import { NoticeForm } from "../components/NoticeForm"
import { NoticeList } from "../components/NoticeList"

//キャッシュ削除のためのimport
import { useQueryClient } from "react-query"

const Dashboard: NextPage = () => {
    
    //キャッシュ削除のためのimport
    const queryClient = useQueryClient()

    //サインアウト時に実行される関数
    const signOut = () => {
        supabase.auth.signOut()
        // キャッシュ削除↓
        queryClient.removeQueries('todos')
        queryClient.removeQueries('notices')
    }

  return (
      <Layout title="Dashboard">
          <LogoutIcon className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
              onClick={signOut} />
          
        <div className="grid grid-cols-2 gap-40">
        <div>
            <div className="my-3 flex justify-center">
                <DocumentTextIcon className=" h-8 w-8 text-blue-500" />
            </div>
            <TaskForm />
            <TaskList />
        </div> 

        <div>
            <div className="my-3 flex justify-center">
                <StatusOnlineIcon className=" h-8 w-8 text-blue-500" />
            </div> 
            <NoticeForm />
            <NoticeList />
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard