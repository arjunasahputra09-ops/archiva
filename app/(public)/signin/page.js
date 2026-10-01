import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Sign in - Archiva Digital Solutions" };
export default function SignIn() {
  return (<div className="card auth-card mx-auto my-md-4" style={{ maxWidth: 420 }}><div className="card-body"><h1>Sign in</h1>
    <AuthForm mode="signin" />
    <p className="small text-secondary mt-3 mb-0">Belum punya akun? <Link href="/signup">Sign up</Link></p></div></div>);
    className="small text-secondary mt-3 mb-0"
}
