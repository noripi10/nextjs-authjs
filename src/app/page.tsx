import { redirect } from 'next/navigation';
import HomeClientPage from './_components/pages/HomeClientPage';

const url = process.env.NEXTAUTH_URL;
const getMe = async () => {
  const res = await fetch(`${url}/api/auth/me`, { cache: 'no-store' });
  const data = await res.json();
  console.info({ data });
  return data;
};

export default async function Home() {
  // ここでリダイレクトもできる
  const me = await getMe().catch((e) => null);
  if (!me) {
    redirect(`${url}/dnd`);
  }
  return <HomeClientPage />;
}
