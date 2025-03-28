
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const therapyOptions = [
  { value: "speech", label: "Speech Therapy" },
  { value: "occupational", label: "Occupational Therapy" },
  { value: "behavioral", label: "Behavioral Therapy" },
  { value: "sensory", label: "Sensory Therapy" },
  { value: "developmental", label: "Developmental Therapy" },
  { value: "adl", label: "ADL Skills" },
  { value: "special", label: "Special Needs" },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age > 0 && age <= 18;
  }, { message: "Age must be a number between 1-18" }),
  therapyType: z.string({ required_error: "Please select a therapy type" }),
});

interface AddChildFormProps {
  onSuccess?: (data: any) => void;
}

export default function AddChildForm({ onSuccess }: AddChildFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      therapyType: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to save the child data
      console.log("Child data submitted:", data);
      
      toast.success("Child information added successfully");
      
      if (onSuccess) {
        // Convert the age string to a number
        const childData = {
          ...data,
          age: parseInt(data.age),
          id: `temp-${Date.now()}`, // Temporary ID (would come from backend)
          needsType: therapyOptions.find(opt => opt.value === data.therapyType)?.label,
          supervisor: null,
          therapist: null,
          sessionsLeft: 10, // Default number of sessions
        };
        onSuccess(childData);
      }
      
      form.reset();
    } catch (error) {
      console.error("Error adding child:", error);
      toast.error("Failed to add child information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter child's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child's Age</FormLabel>
              <FormControl>
                <Input placeholder="Age in years" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="therapyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Therapy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select needed therapy type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {therapyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Child"}
        </Button>
      </form>
    </Form>
  );
}
