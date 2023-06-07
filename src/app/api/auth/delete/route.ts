import { authOptions } from '../[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { client } from '@/libs/prisma';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  console.info({ searchParams });

  const session = await getServerSession(authOptions);
  console.info({ session });

  const me = await client.user.findFirst({
    where: {
      name: session?.user?.name,
      email: session?.user?.email,
    },
  });

  await client.user.delete({
    where: {},
  });

  return NextResponse.json({ me });
};
