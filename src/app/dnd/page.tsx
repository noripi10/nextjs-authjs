import { redirect } from 'next/navigation';
import { DndClinetPage } from '../_components/pages/DndClientPage';

const url = process.env.NEXTAUTH_URL;
const getMe = async () => {
  const res = await fetch(`${url}/api/auth/me`, { cache: 'no-store' });
  const data = await res.json();
  console.info({ data });
  return data;
};

export default async function DndPage() {
  // ここでリダイレクトもできる
  const me = await getMe().catch((e) => null);
  if (!me) {
    redirect(`${url}/`);
  }
  return <DndClinetPage />;
}
