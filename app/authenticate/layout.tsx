import Layout from "@/components/Layout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Layout>{children}</Layout>
    </section>
  );
}
