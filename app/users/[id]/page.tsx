import FollowButton from "@/components/FollowButton/FollowButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user) {
    return {
      title: "User not found",
    };
  } else {
    return {
      title: user.name,
      description: `Bio: ${user.bio}, Age: ${user.age}`,
    };
  }
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <img
        src={user.image ?? "/mememan.webp"}
        alt={`${user.name}'s profile`}
        width={300}
      />
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Bio: {user.bio}</p>
      <p>Email: {user.email}</p>
      <FollowButton targetUserId={params.id} />
    </div>
  );
}
