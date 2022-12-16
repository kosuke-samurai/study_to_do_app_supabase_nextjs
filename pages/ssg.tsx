import Link from "next/link"
import { useRouter } from "next/router"
import { NextPage} from "next"
import { GetStaticProps } from "next"

import { Layout } from "../components/Layout"
import { supabase } from "../utils/supabase"
import{Task,Notice} from '../types/types'


export const getStaticProps: GetStaticProps = async () => {
    console.log('getStaticProps/ssg invoked')

    //supabeseにアクセスしてデータを取得してくるコード
    const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
    //supabeseにアクセスしてデータを取得してくるコード↑

        //supabeseにアクセスしてデータを取得してくるコード
    const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
    //supabeseにアクセスしてデータを取得してくるコード↑
    

    //propsでデータを渡す
    return {props:{tasks,notices}}
    
}

//データ型の配列の定義
type StaticProps = {
    tasks: Task[]
    notices:Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
    const router = useRouter();
  return (
      <Layout title='SSG'>
          <p className="mb-3 text-blue-500">SSG</p>
          
          <ul className="mb-3">
              {/* データの表示 */}
              {tasks.map((task) => {
                  return (
                      <li key={task.id}>
                          <p className="text-lg font-extrabold">{task.title}</p>
                      </li>
                  )
              })}
          </ul>

            <ul className="mb-3">
              {/* データの表示 */}
              {notices.map((notice) => {
                  return (
                      <li key={notice.id}>
                          <p className="text-lg font-extrabold">{notice.content}</p>
                      </li>
                  )
              })}
          </ul>

            <Link href='/ssr' prefetch={false} className='my-3 text-xs'>
               Link to ssr
            </Link>
            <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
                Route to ssr
            </button>
      </Layout>
  )
}

export default Ssg