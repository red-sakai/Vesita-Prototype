import dummyData from "@/data/dummy.json";
import type { DemoUser } from "@/components/sign-in-form";
import { AdminUsersClient } from "@/components/sections/admin/admin-users-client";

export default function AdminUsersPage() {
  const users = dummyData.users as DemoUser[];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Admin Portal</p>
        <h1 className="text-4xl font-semibold text-white">User Management</h1>
        <p className="text-sm text-white/60">
          Manage user accounts, roles, and permissions.
        </p>
      </div>
      <AdminUsersClient users={users} />
    </div>
  );
}

