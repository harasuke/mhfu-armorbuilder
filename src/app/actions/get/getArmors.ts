'use server'

import { prisma } from '@/lib/prisma'

export async function getArmors() {

  return await prisma.armorPiece.findMany({
    take: 30,
    include: {
      ArmorPieceSkill: {
        select: {
          skillPoints: true,
          Skill: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}