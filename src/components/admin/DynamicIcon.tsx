"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
interface AppIconProps {
  /** kebab-case icon name as stored in MongoDB, e.g. "wifi", "shield-check" */
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Renders a Lucide icon from its stored kebab-case name. Used anywhere
 * a CMS-selected icon needs to be displayed — Plan Categories, Business
 * Services list, and Why-Choose-Us cards — on both the admin picker
 * preview and the public-facing pages.
 */
export default function AppIcon({
  name,
  size = 24,
  className,
  strokeWidth = 2,
}: AppIconProps) {
  if (!name) return null;

  return (
    <DynamicIcon
      name={name as IconName}
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      fallback={() => <span style={{ width: size, height: size }} />}
    />
  );
}