import { useRouter } from 'next/router';

export default function Page({ data }: any) {
  const router = useRouter();
  //fallback:true   页面的“第二选择”，适用于构建页面时间比较长，不让用户觉得干等着
  // if(router.isFallback) {
  //   return (
  //     <h1>Loading...</h1>
  //   )
  // }
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
// export async function getStaticPaths() {
//   const res = await fetch(`https://dummyjson.com/products`);
//   const data = await res.json();
//   return {
//     paths: data.products.map((c: any) => ({
//       params: { listId: c.id.toString() },
//     })),
//     fallback: false,
//   };
// }

/*三、按需生成页面*/
/*
fallback
- fallback是false，则任何未返回的路径都getStaticPaths将导致404 页面。
- fallback是'blocking',则后端next为你提供服务(以next为核心的web服务)。当你请求对应的/products/[id]时，会对应构建【按需构建】,这个构建是next服务完成的，
  next构建完成之后，会把构建的结果sever/pages/lists中，等你下次再访问相同的/products/[id]时就不需要再构建(直接走构建好的html)
  注意：这个不是ssr，是SSG(服务端构建/生成)，它只是在你请求的时候，服务端来生成，【它生成之后就不再变了】
- fallback是true, 你的Page(){}页面会有“第二选择”，详情看Page函数

总结：什么时候按需生成：我们可以在getStaticPaths 的return paths中先默认return出用户访问频率较高的页面，其他的页面 按需生成
*/

export async function getStaticPaths() {
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();
  return {
    paths: [{ params: { listId: '1' } }, { params: { listId: '2' } }],
    fallback: true,
  };
}

//2.接着会调用这个函数，并把getStaticPaths里paths作为参数传给这个函数
export async function getStaticProps(context: any) {
  const res = await fetch(
    `https://dummyjson.com/products/${context.params.listId}`
  );
  const data = await res.json();
  return { props: { data } };
}
