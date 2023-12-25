'use client';

import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { File, Loader2, Pencil, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import { FileUpload } from '@/components/file-upload';

const formSchema = z.object({
  url: z.string().min(1),
});

interface AttachmentFormProps {
  courseData: Course & { attachments: Attachment[] };
  courseId: string;
};

const AttachmentForm = ({
  courseData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const onDeleteHandler = async(id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success('Attachment deleted successfully');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success('Course updated');
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='flex justify-between items-center font-medium mb-3'>
        Course Attachments
        {
          !isEditing ?
            <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : <><PlusCircle className='h-4 w-4 mr-2' />
                Add a file</>}
            </Button> :
            <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : <><Pencil className='h-4 w-4 mr-2' />
                Edit files</>}
            </Button>
        }
      </div>
      {!isEditing && courseData.attachments.length === 0
        ?
        <>
          <p className='text-sm text-slate-500 italic mt-2'>No Attachments yet</p>
        </>
        :
        isEditing ?
          <div>
            <FileUpload
              endpoint='courseAttachment'
              onChange={(url) => { if (url) onSubmit({ url: url }) }}
            />
            <div className='text-xs text-muted-foreground mt-4'>
              Add anything that your student might need to complete the course
            </div>
          </div>
          :
          <div>
            {courseData.attachments.map((attachment) => (
              <div key={attachment.id} className='flex items-center w-full rounded-md bg-sky-100 border-sky-200 border text-sky-900 p-3 gap-2'>
                <File className='h-4 w-4 flex-shrink-0 mr-2' />
                <p className='text-xs line-clamp-1'>{attachment.name}</p>
                {deletingId === attachment.id ?
                  <Loader2 className='h-4 w-4 animate-spin ml-auto' /> :
                  <button className='ml-auto hover:opacity-75 transition' onClick={() =>onDeleteHandler(attachment.id)}>
                    <X className='h-4 w-4 ml-auto' />
                  </button>
                }
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default AttachmentForm;
