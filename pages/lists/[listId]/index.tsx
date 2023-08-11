import { useRouter } from 'next/router';

export default function Page({ data }: any) {
  const router = useRouter();
  console.log(data);
  // console.log(router.query.listId);
  return <div>{data.description}</div>;
}

/*一、部分生成(根据自己手动提供的paths来生成部分页面)*/
// export async function getStaticPaths() {
//   //返回值传给getStaticProps
//   return {
//     //path: build时决定哪些路由会被预渲染
//     paths: [{ params: { listId: '1' } }, { params: { listId: '2' } }],
//     fallback: false,
//   };
// }

/*二、全量生成(就是通过productsAll接口，map出所有paths id),来预生成所有html*/
export async function getStaticPaths() {
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();
  return {
    paths: data.products.map((c: any) => ({
      params: { listId: c.id.toString() },
    })),
    fallback: false,
  };
}

/*三、按需生成页面*/
/*
fallback
- fallback是false，则任何未返回的路径都getStaticPaths将导致404 页面。
- 
*/ 

//2.接着会调用这个函数，并把getStaticPaths里paths作为参数传给这个函数
export async function getStaticProps(context: any) {
  const res = await fetch(
    `https://dummyjson.com/products/${context.params.listId}`
  );
  const data = await res.json();
  return { props: { data } };
}
