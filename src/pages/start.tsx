import { GetServerSideProps } from "next";
import { getOAuth2Url } from "../services/googleAuth";

export interface StartProps {
  googleAuthUrl: string;
}
export const getServerSideProps: GetServerSideProps<StartProps> = async () => {
  const googleAuthUrl = getOAuth2Url();
  return {
    props: {
      googleAuthUrl,
    },
  };
};

export default function Start(props: StartProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <pre>{props.googleAuthUrl}</pre>
      <a href={props.googleAuthUrl}>start here</a>
    </main>
  );
}
