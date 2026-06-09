"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { ContactFormCopy } from "@/types/homepage";
import { HOME_PAGE_DEFAULTS } from "@/lib/strapi/defaults-home";

export interface ContactFormProps {
  copy?: ContactFormCopy;
}

export function ContactForm({ copy: copyProp }: ContactFormProps) {
  const copy = copyProp ?? HOME_PAGE_DEFAULTS.contactForm;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, copy.validation.nameMin),
        email: z.string().email(copy.validation.emailInvalid),
        message: z.string().min(10, copy.validation.messageMin),
      }),
    [copy],
  );

  type ContactFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: copy.toastSuccess.title,
        description: copy.toastSuccess.description,
      });

      reset();
    } catch {
      toast({
        title: copy.toastError.title,
        description: copy.toastError.description,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{copy.nameLabel}</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder={copy.namePlaceholder}
            error={errors.name?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{copy.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder={copy.emailPlaceholder}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{copy.messageLabel}</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder={copy.messagePlaceholder}
            rows={6}
            error={errors.message?.message}
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
        </Button>
      </form>
    </motion.div>
  );
}
