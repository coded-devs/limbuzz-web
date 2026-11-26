import {
  MessageSquare,
  MapPin,
  Phone,
  Mic,
  Download,
  Radio,
  Users,
  Smartphone,
  ChevronDown,
} from "lucide-react";
const icons = {
  message: MessageSquare,
  location: MapPin,
  phone: Phone,
  audio: Mic,
  download: Download,
  radio: Radio,
  users: Users,
  smartphone: Smartphone,
  chevron: ChevronDown,
};
export function Icon({ name }: { name: keyof typeof icons }) {
  const Component = icons[name];
  return <Component size={24} strokeWidth={1.6} aria-hidden="true" />;
}
