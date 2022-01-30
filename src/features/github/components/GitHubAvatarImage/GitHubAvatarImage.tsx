import Image from 'next/image';

export interface GitHubAvatarImageProps {
  avatarUrl: string;
}

const GitHubAvatarImage = (props: GitHubAvatarImageProps) => {
  const { avatarUrl } = props;

  if (!avatarUrl) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="rounded-full mx-auto inline-block overflow-hidden border-teal-700 border-2 shadow-xl"
        style={{ width: 300, height: 300 }}
      >
        <Image src={avatarUrl} alt="GitHub Avatar" width={300} height={300} />
      </div>
    </div>
  );
};

export default GitHubAvatarImage;
