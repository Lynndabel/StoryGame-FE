"use client";

import { useEffect, useState } from "react";


const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="hidden md:flex">
        <appkit-button balance="hide" />
      </div>
      <div className="md:hidden flex">
        <appkit-button label="Connect" balance="hide" />
      </div>
     
    </div>
  );
};
export default ConnectWallet;
