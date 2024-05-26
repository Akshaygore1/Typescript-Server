import prisma from '../database/db.config';
import express from 'express';

// model Profile {
//     id        Int      @id @default(autoincrement())
//     userId    Int      @unique
//     bio       String?
//     avatarUrl String?
//     theme     String   @default("default")
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     user      User     @relation(fields: [userId], references: [id])
//   }

export const createProfile = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { userId, bio, avatarUrl, theme } = req.body;
		const profile = await prisma.profile.create({
			data: {
				userId,
				bio,
				avatarUrl,
			},
		});

		return res.status(200).json({
			message: 'Profile created successfully',
			data: profile,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({ message: 'Internal server error' });
	}
};
