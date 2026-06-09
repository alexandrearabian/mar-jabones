// User profile management page

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/dashboard/profile-form";

export const metadata = {
  title: "Mi perfil",
  description: "Gestiona tu información personal",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Mi perfil</h1>
      <p className="mt-2 text-slate-600">
        Actualiza tu información personal
      </p>

      <div className="mt-8">
        <ProfileForm user={session.user} />
      </div>
    </div>
  );
}


