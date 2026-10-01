import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Sign up - Archiva Digital Solutions" };
export default function SignUp() {
  return (<div className="card auth-card mx-auto my-md-4" style={{ maxWidth: 420 }}><div className="card-body"><h1>Sign up</h1>
    <AuthForm mode="signup" />
    <p className="small text-secondary mt-3 mb-0">Sudah punya akun? <Link href="/signin">Sign in</Link></p></div></div>);
    className="small text-secondary mt-3 mb-0"
}
