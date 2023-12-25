import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.id,
        id: params.attachmentId,
      },
    }); 

    return NextResponse.json(attachment);
  } catch (error) {
    console.log('courseAttachments delete', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
