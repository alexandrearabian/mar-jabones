import { ContactForm } from "@/components/home/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";

export const metadata = {
  title: "Contacto",
  description: "Escribinos para consultas, pedidos especiales o soporte.",
};

export default function ContactoPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Contacto"
        subtitle="Estamos para acompañarte. Envíanos tu consulta y te responderemos pronto."
      />
      <ContactForm />
    </PageShell>
  );
}
