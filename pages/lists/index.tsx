/* 静态路由 */ 
import Link from 'next/link';

/* 2.props返回后，框架再次调用Page渲染函数(并把props作为输入参数) */
export default function Page({ data }: any) {
  return (
    <div>
      <h1>List Page</h1>
      {data.products.map((cur: any) => (
        <li key={cur.id}>
          <Link href={'/lists/' + cur.id}>{cur.title}</Link>
        </li>
      ))}
    </div>
  );
}

/* 1.build时nextJS调用*/
export async function getStaticProps() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  //返回一个带有props的结构体，传入Page函数
  return {
    props: {
      data,
    },
  };
}
