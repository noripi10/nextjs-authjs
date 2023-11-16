import { redirect } from 'next/navigation';
import { DndClinetPage } from '../_components/pages/DndClientPage';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const url = process.env.NEXTAUTH_URL;
const getMe = async () => {
  const res = await fetch(`${url}/api/auth/me`, { cache: 'no-store' });
  const data = await res.json();
  console.info({ data });
  return data;
};

export default async function DndPage() {
  // ここでリダイレクトもできる
  // const me = await getMe().catch((e) => null);
  // if (!me) {
  //   redirect(`${url}/`);
  // }
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`${url}/`);
  }
  return <DndClinetPage />;
}
