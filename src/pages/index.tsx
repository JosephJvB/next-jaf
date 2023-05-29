import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getOAuth2Url } from "../services/server/auth/oAuth2";
import { getGoogleToken } from "../services/browser/auth";

export interface HomeProps {
  googleAuthUrl: string;
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // TODO: can we do this on client side? (not with current googleapis library)
  const googleAuthUrl = getOAuth2Url();
  return {
    props: {
      googleAuthUrl,
    },
  };
};

// TODO manual logout button
export default function Home(props: HomeProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const token = getGoogleToken();
    if (token) {
      router.push("/plants");
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="w-[100%] max-w-[100%] px-4">
        <div className="px-1">
          <div className="border-grey-200 relative flex flex-col items-center justify-center space-y-6 rounded-lg border-2 border-solid bg-white px-5 py-8">
            <a href={props.googleAuthUrl}>Login</a>
          </div>
        </div>
      </div>
    </main>
  );
}
