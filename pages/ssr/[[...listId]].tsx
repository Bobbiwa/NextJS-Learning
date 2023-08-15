import { useRouter } from 'next/router';
export default function Page({ data }: any) {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>SSR page</h1>
      {data.map((c: any) => (
        <li key={c.id}>{c.title}</li>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const json = await res.json();
  return {
    props: { data: json.products },
  };
}
