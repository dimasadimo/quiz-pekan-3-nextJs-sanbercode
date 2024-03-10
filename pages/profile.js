import dynamic from "next/dynamic";
import Image from "next/image";

const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function Profile() {
  return (
    <LayoutComponent metaTitle="Profile" metaDescription="All contents belong to Profile">
      <p className="background-orange">Profile</p>
      <Image
      src="/dog_cartoon.jpg"
      alt="Picture of the author"
      width={500}
      height={500}
      blurDataURL="data:..."
      placeholder="blur"
    />
    </LayoutComponent>
  );
}
