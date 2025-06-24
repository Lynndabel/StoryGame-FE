"use client";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("Notification");

  const renderContent = () => {
    switch (selectedTab) {
      case "Notification":
        return <NotificationSettings />;
      case "Privacy":
        return <PrivacySettings />;
      case "Account":
        return <AccountSettings />;
      default:
        return <NotificationSettings />;
    }
  };

  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] border border-[#FCFBF726] rounded-lg gap-y-8 flex-col">
      <div className="flex justify-between">
        <h3 className="text-2xl">Settings</h3>
        
      </div>
      <div className="flex space-x-4 justify-between items-start border-b border-[#F2E8CFB2]">
        <button
          className={`px-4 py-2  ${
            selectedTab === "Notification"
              ? "text-[#ffffff] border-b border-[#FFFFFF]"
              : "text-[#F2E8CFB2]"
          }`}
          onClick={() => setSelectedTab("Notification")}
        >
          Notification
        </button>
        <button
          className={`px-4 py-2  ${
            selectedTab === "Privacy"
              ? "text-[#ffffff] border-b border-[#FFFFFF]s"
              : "text-[#F2E8CFB2]"
          }`}
          onClick={() => setSelectedTab("Privacy")}
        >
          Privacy
        </button>
        <button
          className={`px-4 py-2  ${
            selectedTab === "Account"
              ? "text-[#ffffff] border-b border-[#FFFFFF]"
              : "text-[#F2E8CFB2]"
          }`}
          onClick={() => setSelectedTab("Account")}
        >
          Account
        </button>
      </div>
      <div className="">{renderContent()}</div>
    </div>
  );
};

const NotificationSettings = () => {
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
    const [pushChecked, setPushChecked] = useState<boolean>(false);


  return (
    <div className="space-y-4">
      <h4 className="font-bold">Email Notifications</h4>
      <div className="flex gap-x-2 text-sm">
      <div className="relative h-[20px] w-[20px]">
        <input
          type="checkbox"
          onChange={() => setEmailChecked(!emailChecked)}
          checked={emailChecked}
          className=" appearance-none h-[20px] w-[20px] border-2 rounded-md p-2 checked:border-0 checked:bg-yellow border-[#9A9992]"
        />
        {emailChecked && (
          <FaCheck
            size={12}
            color={"#111A00"}
            className="absolute top-[5px] left-[4px]"
            onClick={() => setEmailChecked(!emailChecked)}
          />
        )}
      </div>
      <span>Receive email notifications for new job postings, messages, etc</span>
      </div>
      <h4 className="font-bold">Push Notifications</h4>
      <div className="flex gap-x-2 text-sm">
      <div className="relative h-[20px] w-[20px]">
        <input
          type="checkbox"
          onChange={() => setPushChecked(!pushChecked)}
          checked={pushChecked}
          className=" appearance-none h-[20px] w-[20px] border-2 rounded-md p-2 checked:border-0 checked:bg-yellow border-[#9A9992]"
        />
        {pushChecked && (
          <FaCheck
            size={12}
            color={"#111A00"}
            className="absolute top-[5px] left-[4px]"
            onClick={() => setPushChecked(!pushChecked)}
          />
        )}
      </div>
      <span>Receive push notifications on the mobile app for important alerts.</span>
      </div>
    </div>
  );
};

const PrivacySettings = () => (
  <div>
    <h4 className="text-xl">Privacy Settings</h4>
    <p>Update your privacy settings here.</p>
  </div>
);

const AccountSettings = () => (
  <div>
    <h4 className="text-xl">Account Settings</h4>
    <p>Modify your account details here.</p>
  </div>
);

export default Settings;
