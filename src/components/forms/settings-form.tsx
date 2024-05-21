"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSettingsStore from "@/stores/useSettingsStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  export: z.object({
    width: z.coerce
      .number()
      .min(1, "Width must be at least 1.")
      .max(2048, "Width must be at most 2048."),
    height: z.coerce
      .number()
      .min(1, "Height must be at least 1.")
      .max(2048, "Height must be at most 2048."),
    fileName: z.string().min(1),
    format: z.enum(["png", "jpg"]),
    transparency: z.boolean(),
    backgroundColor: z.string().min(1).max(7),
    outline: z.object({
      enabled: z.boolean(),
      color: z.string().min(1).max(7),
      width: z.coerce
        .number()
        .min(1, "Width must be at least 1.")
        .max(25, "Width must be at most 25."),
    }),
  }),
});

export interface SettingsFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function SettingsForm(props: SettingsFormProps) {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      export: {
        width: settings.export.width,
        height: settings.export.height,
        fileName: settings.export.fileName,
        format: settings.export.format,
        transparency: settings.export.transparency,
        backgroundColor: settings.export.backgroundColor,
        outline: {
          enabled: settings.export.outline.enabled,
          color: settings.export.outline.color,
          width: settings.export.outline.width,
        },
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSettings({
      ...settings,
      export: {
        ...settings.export,
        width: values.export.width,
        height: values.export.height,
        fileName: values.export.fileName,
        format: values.export.format,
        transparency: values.export.transparency,
        backgroundColor: values.export.backgroundColor,
        outline: {
          ...settings.export.outline,
          enabled: values.export.outline.enabled,
          color: values.export.outline.color,
          width: values.export.outline.width,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const values = form.getValues();

          onSubmit(values);
          props.onSubmit(values);
        }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="export.width"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="512" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="export.height"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="512" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="export.fileName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>File name</FormLabel>
                <FormControl>
                  <Input placeholder="render" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="export.format"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Format</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="png" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <FormField
            control={form.control}
            name="export.backgroundColor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="block" size="sm">
                        Choose
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="export.outline.color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Outline Color</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="block" size="sm">
                        Choose
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="export.outline.width"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Outline Width</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={25}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-8 py-4">
          <FormField
            control={form.control}
            name="export.transparency"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!m-0">Transparency</FormLabel>
                <FormMessage className="!m-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="export.outline.enabled"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!m-0">
                  Outline (only visible in final export)
                </FormLabel>
                <FormMessage className="!m-0" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
