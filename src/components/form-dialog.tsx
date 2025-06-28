import { useEffect, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  type ControllerRenderProps,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { Button } from "./ui/button";

export type FormField = {
  name: string;
  label: string;
  description?: string;
  control: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
};

type Props<T> = {
  open: boolean;
  title: string;
  trigger: ReactNode;
  triggerAsChild?: boolean;
  description: string;
  form: UseFormReturn<any>;
  fields: FormField[];
  onSubmit: (values: T) => void;
  onChangeOpen?: (value: boolean) => void;
};

function FormDialog<T>({
  open: openValue,
  trigger,
  triggerAsChild,
  description,
  title,
  fields,
  form,
  onSubmit,
  onChangeOpen,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openValue);
  }, [openValue]);

  function hancleCancel() {
    setOpen(false);
    form.reset();
    form.clearErrors();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (onChangeOpen) onChangeOpen(v);
      }}
    >
      <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="overflow-auto space-y-4 px-2 md:px-0">
                {fields.map(({ name, label, description, control }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">{label}</FormLabel>
                        <FormControl>{control(field)}</FormControl>
                        {description && (
                          <FormDescription className="text-xs">
                            {description}
                          </FormDescription>
                        )}
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <DialogFooter>
                <Button onClick={hancleCancel}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { FormDialog };
