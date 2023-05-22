import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { LocalStorage } from "../constants";
import { getOAuth2Url } from "../services/server/auth/oAuth2";

export interface HomeProps {
  googleAuthUrl: string;
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const googleAuthUrl = getOAuth2Url();
  return {
    props: {
      googleAuthUrl,
    },
  };
};

export default function Home(props: HomeProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(LocalStorage.AuthKey);
    if (token) {
      router.push("/plants");
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24">
      <div className="border-grey-200 relative flex h-[80vh] max-h-[600px] w-[100%] flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid bg-white px-5 py-8">
        <a href={props.googleAuthUrl}>Login</a>
      </div>
    </main>
  );
}
