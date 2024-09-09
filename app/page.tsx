'use client'

import Navbar from "@/components/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { useState } from "react";


const formSchema = z.object({
  question: z.string().min(10).max(100),
});

export default function Home() {


  const { handleInputChange, handleSubmit, messages, isLoading, setInput } = useChat();

  const [inputValue, setInputValue] = useState('');

  const handleInputChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleInputChange(event);
  };

  const handleSubmitWrapper = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(event);
    setInputValue('');
  };

  console.log(messages);

  return (
    <div className="">
      <Navbar title="My Website" />
      <section className="flex flex-col justify-center items-center">
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}

            className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Question
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={handleInputChange}
                      placeholder="What is your name?"
                      type="text"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={'secondary'}>Submit</Button>
          </form>
        </Form> */}

        <form
          onSubmit={handleSubmitWrapper}
          className="space-y-2 max-w-96">
          <input
            type="text"
            name="question"
            value={inputValue}
            onChange={handleInputChangeWrapper}
            className="border border-gray-300 rounded-md p-2 mr-2"
            placeholder="En qué te puedo ayudar?"
          />
          <Button
            disabled={isLoading}
            type="submit"
          >Submit</Button>
          <div className="max-h-96 overflow-y-auto h-full">
            {
              messages.map((message, index) => (
                <div key={index} className={cn("relative p-2 dark:bg-slate-500 bg-gray-100 my-2  flex flex-col rounded-2xl",
                  message.role === "user" ? "items-start bg-sky-500 dark:bg-sky-600 text-slate-200 px-6" : "ml-8 px-8")}>
                  <span className={cn("absolute",
                    message.role === "user" ? "right-4 top-0" : "hidden"
                  )}>{message.role}</span>
                  <p>{message.content}</p>
                </div>
              ))
            }
          </div>
        </form>
      </section>
    </div>
  );
}
