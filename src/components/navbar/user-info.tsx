import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface UserInfoProps {
  user: User;
}
export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex w-full justify-between items-center">
      <span className="text-2xl font-medium">{user.user_metadata.name}</span>
      <Image
        className="rounded-full object-cover"
        src={user.user_metadata.avatar_url}
        alt="avatar"
        width={60}
        height={60}
      />
    </div>
  );
}
