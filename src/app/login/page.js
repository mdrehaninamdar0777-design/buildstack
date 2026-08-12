import LandingNavbar from "@/components/marketing/navbar/LandingNavbar";
import Footer from "@/components/marketing/footer/Footer";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <LandingNavbar />

      <main>
        <section className="px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
          <div className="mx-auto flex max-w-7xl justify-center">
            <LoginForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}