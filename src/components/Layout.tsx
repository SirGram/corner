import Footer from "./Footer";
import Menubar from "./Menubar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Menubar />
      <main className="flex flex-col mx-auto min-h-screenmt-20 mt-20 max-w-[80rem]">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
