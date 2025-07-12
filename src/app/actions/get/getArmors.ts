'use server'

import { prisma } from '@/lib/prisma'

export async function getArmors() {

  return await prisma.armorPiece.findMany({
    take: 10
  });
}