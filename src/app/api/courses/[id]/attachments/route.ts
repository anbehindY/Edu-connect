import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = auth();
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const { url } = await req.json();
		const courseOwner = await db.course.findUnique({
			where: {
				id: params.id,
				userId: userId,
			},
		});

		if (!courseOwner) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const attachment = await db.attachment.create({
			data: {
				url: url,
				name: url.split('/').pop(),
				courseId: params.id,
			},
		});

		return NextResponse.json(attachment);
	} catch (error) {
		console.log('courseAttachments', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
