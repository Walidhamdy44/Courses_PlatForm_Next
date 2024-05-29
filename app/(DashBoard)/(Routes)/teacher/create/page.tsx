"use Client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z  from "zod";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
});

const CreatePage = () => {
  return (

  );
};

export default CreatePage;
