import Link from "next/link";
import { footerLinks } from "@/utils/links";

const FooterLinks = () => {
  return (
    <>
      {footerLinks.map(({name, links}) => (
        <div key={name} className="grid gap-y-2 font-merriweather text-sm">
          <h4 className="py-2 h-[35px] border-b-2 border-white text-base w-fit">
            {name}
          </h4>
          {links.map((link) => (
            <Link  key={link.name} href={link.href}>{link.name}</Link>
          ))}
        </div>
      ))}
    </>
  );
};
export default FooterLinks;
