// User addresses management page

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddressList } from "@/components/dashboard/address-list";

export const metadata = {
  title: "Mis direcciones",
  description: "Gestiona tus direcciones de envío",
};

export default async function AddressesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Mis direcciones</h1>
      <p className="mt-2 text-slate-600">
        Gestiona tus direcciones de envío
      </p>

      <div className="mt-8">
        <AddressList userId={session.user.id} />
      </div>
    </div>
  );
}


