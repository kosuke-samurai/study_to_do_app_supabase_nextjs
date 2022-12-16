import Link from "next/link"
import { useRouter } from "next/router"
import { NextPage } from "next"
//ssr(サーバーサイドレンダリング用↓)
import { GetServerSideProps } from "next"
import { Layout } from "../components/Layout"
import { supabase } from "../utils/supabase"
import{Task,Notice} from '../types/types'


export const getServerSideProps: GetServerSideProps = async () => {
    console.log('getServerSideProps/ssr invoked')

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

const Ssr: NextPage<StaticProps> = ({ tasks, notices }) => {
    const router = useRouter();
  
    return (
    <Layout title='SSR'>
            <p className="mb-3 text-pink-500">SSR</p>
            
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
            
            <Link href='/ssg' prefetch={false} className='my-3 text-xs'>
               Link to ssg 
            </Link>

            <Link href='/isr' prefetch={false} className='mb-3 text-xs'>
               Link to isr
            </Link>

            <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
                Route to ssg
            </button>
            <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
                Route to isr
            </button>


    </Layout>
  )
}

export default Ssr