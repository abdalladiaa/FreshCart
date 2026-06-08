import ProfileLayout from "@/components/Profile/ProfileLayout/ProfileLayout";

export default function ProfileTab({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  return <ProfileLayout params={params} />;
}
