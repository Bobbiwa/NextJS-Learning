/* 相当于<App/> */ 
import Link from "next/link"
export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      {/* 1. 在nextJS run start生产模式中，<Link>标签会默认预取标签里的JSON内容(看后台network) */}
      {/* prefetch可以关闭预取 */}
      <Link href="/lists" prefetch={false}>Go to Lists</Link>
    </>
  )
}
