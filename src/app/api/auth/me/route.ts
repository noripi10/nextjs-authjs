import { authOptions } from '../[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { client } from '@/libs/prisma';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  console.info({ searchParams });
  console.info('req.url', req.url);

  const session = await getServerSession(authOptions);
  console.info({ session });

  const me = await client.user.findFirst({
    where: {
      name: session?.user?.name,
      email: session?.user?.email,
    },
  });

  if (!me) {
    throw new Error('no user');
  }

  const accounts = await client.account.findMany({
    where: {
      userId: me.id,
    },
  });

  const linkProviders = accounts.map((e) => e.provider);

  return NextResponse.json({ ...me, linkProviders });
};
