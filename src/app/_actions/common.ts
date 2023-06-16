'use server';

import { revalidatePath } from 'next/cache';

export const handleRevalidatePath = (url: string) => {
  revalidatePath(url);
};
