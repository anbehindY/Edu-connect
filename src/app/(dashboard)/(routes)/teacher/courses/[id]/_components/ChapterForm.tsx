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
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Chapter, Course } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1),
});

interface ChapterFormProps {
  courseData: Course & { chapters: Chapter[] };
  courseId: string;
};

const ChapterForm = ({
  courseData,
  courseId,
}: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success('Chapter created successfully!');
      setIsCreating((current) => !current);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='flex justify-between items-center font-medium mb-3'>
        Course chapters
        <Button variant='ghost' onClick={() => setIsCreating(current => !current)}>
          {isCreating ? 'Cancel' : <><PlusCircle className='h-4 w-4 mr-2' />
            Add a chapter</>}
        </Button>
      </div>
      {isCreating ?
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
                      className="overflow-hidden !resize-y"
                      placeholder="e.g. 'This course will teach you how to...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={!isValid || isSubmitting}
            >
              Create
            </Button>
          </form>
        </Form>
        : <div className='text-sm'>
          {<div className={cn('text-sm mt-2', !courseData.chapters.length && 'text-slate-500 italic')}>
            {courseData.chapters.length ? 'List of chapters here' : 'No chapters yet'}
            <p className='text-xs text-muted-foreground mt-4'>Drag and drop to reorder the chapters</p>
          </div>}
        </div>
      }
    </div>
  );
}

export default ChapterForm;
