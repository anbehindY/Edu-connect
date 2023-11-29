'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

interface TitleFormProps {
  courseData: {
    title: string;
  };
  courseId: string;
}

const TitleForm = ({
  courseData,
  courseId,
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: courseData.title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course title updated');
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='flex justify-between items-center font-medium'>
        Course Title
        <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : <><Pencil className='h-4 w-4 mr-2' />
            Edit title</>}
        </Button>
      </div>
      {isEditing ?
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced React and TypeScript'"
                    {...field}
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
        : <div className='text-sm'>{courseData.title}</div>}
    </div>
  );
}

export default TitleForm;
