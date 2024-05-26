import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../database/db.config';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export const signup = async (req: express.Request, res: express.Response) => {
	try {
		const { name, email, password, slug } = req.body;

		if (!name || !email || !password || !slug) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const findAUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: email }, { slug: slug }],
			},
		});

		const mailExists = findAUser && findAUser.email === email ? true : false;
		const slugExists = findAUser && findAUser.slug === slug ? true : false;

		if (mailExists) {
			return res.status(400).json({
				message: 'Email already taken please use another email address',
			});
		}

		if (slugExists) {
			return res.status(400).json({
				message: 'Slug already taken please use another slug',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		console.log({
			salt,
			hashedPassword,
		});

		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
				slug: slug,
			},
		});

		return res.status(201).json({
			message: 'User created successfully',
			data: {
				name,
				email,
				slug,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const findUser = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		if (!findUser) {
			return res.status(400).json({ message: 'User not found' });
		}
		const matchPassword = await bcrypt.compare(password, findUser.password);

		console.log('Match', matchPassword);
		if (!matchPassword) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const obj = {
			id: findUser.id,
			name: findUser.name,
			slug: findUser.slug,
		};
		const token = jwt.sign(obj, JWT_SECRET || '', {
			expiresIn: '1d',
		});

		return res.status(200).json({
			message: 'User logged in successfully',
			token: token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
