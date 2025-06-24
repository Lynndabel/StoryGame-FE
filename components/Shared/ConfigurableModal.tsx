// components/shared/ConfigurableModal.tsx
"use client";
import React from "react";
import BaseModal from "./BaseModal";
import { ModalConfig, marketplaceModals, activeJobModals } from "../Types/ModalTypes";

interface ConfigurableModalProps {
  section: 'marketplace' | 'activeJobs';
  modalType: string;
  onCancel: () => void;
  onConfirm?: () => void;
  overrides?: Partial<ModalConfig>;
  dynamicData?: Record<string, string | number>;
}

const ConfigurableModal: React.FC<ConfigurableModalProps> = ({
  section,
  modalType,
  onCancel,
  onConfirm,
  overrides = {},
  dynamicData = {}
}) => {
  // Get the appropriate modal config based on section
  const modalConfigs = section === 'marketplace' ? marketplaceModals : activeJobModals;
  const config = { ...modalConfigs[modalType], ...overrides };
  
  if (!config) {
    console.error(`Modal type "${modalType}" not found in section "${section}"`);
    return null;
  }

  // Process content to replace placeholders
  const processedContent = config.content.map((text, index) => {
    if (typeof text === 'string') {
      let processedText = text;
      
      // Replace dynamic placeholders
      Object.entries(dynamicData).forEach(([key, value]) => {
        const placeholder = `{${key}}`;
        if (processedText.includes(placeholder)) {
          if (key === 'craftCoins') {
            processedText = processedText.replace(
              placeholder,
              `<span class="font-semibold" style="color: #FAB427">[${value} CraftCoins]</span>`
            );
          } else {
            processedText = processedText.replace(placeholder, String(value));
          }
        }
      });
      
      // If we have HTML content, render it safely
      if (processedText !== text) {
        return (
          <p 
            key={index} 
            className="text-[#D8D6CF] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedText }}
          />
        );
      }
      
      return (
        <p key={index} className="text-[#D8D6CF] leading-relaxed">
          {processedText}
        </p>
      );
    }
    
    return text; // Return ReactNode as-is
  });

  return (
    <BaseModal
      title={config.title}
      content={processedContent}
      onCancel={onCancel}
      cancelText={config.cancelText}
      primaryButton={{
        ...config.primaryButton,
        action: config.primaryButton.type === 'button' ? onConfirm : undefined
      }}
      titleBorderColor={config.titleBorderColor}
      className={config.className}
    />
  );
};

export default ConfigurableModal;