'use client';

import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

const formSchema = z.object({
  imageUrl: z.string().min(1, 'Image is required'),
});

interface ImageFormProps {
  courseData: Course;
  courseId: string;
}

const ImageForm = ({
  courseData,
  courseId,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='flex justify-between items-center font-medium mb-3'>
        Course Image
        {
          !isEditing && !courseData.imageUrl ?
            <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : <><PlusCircle className='h-4 w-4 mr-2' />
                Add Image</>}
            </Button> :
            <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : <><Pencil className='h-4 w-4 mr-2' />
                Edit Image</>}
            </Button>
        }
      </div>
      {!isEditing && !courseData.imageUrl ? <div className='flex rounded-md items-center justify-center bg-slate-200 h-60'><ImageIcon className='w-10 h-10' /></div>
        :
        !isEditing && courseData.imageUrl
          ?
          <div className='relative aspect-video mt-2'>
            <Image src={courseData.imageUrl} alt='course image' fill className='object-cover rounded-md' />
          </div>
          :
          isEditing ?
            <div>
              <FileUpload
                endpoint='courseImage'
                onChange={(url) => { if (url) onSubmit({ imageUrl: url }) }}
              />
              <div className='text-xs text-muted-foreground mt-4'>
                Aspect ratio 16:9 recommended
              </div>
            </div>
            : null
      }
    </div>
  );
}

export default ImageForm;
