export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-[url('/bg.png')] min-h-screen  bg-opacity-[25%]">
      <div className="flex flex-col bg-[#333333] bg-opacity-[95%] min-h-screen ">
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
}
