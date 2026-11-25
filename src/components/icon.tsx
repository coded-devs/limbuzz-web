import {
  Timer,
  MessageSquare,
  MapPin,
  Phone,
  Mic,
  History,
  Download,
  Check,
  Radio,
  Users,
  Smartphone,
  ChevronDown,
} from "lucide-react";
const icons = {
  timer: Timer,
  message: MessageSquare,
  location: MapPin,
  phone: Phone,
  audio: Mic,
  history: History,
  download: Download,
  check: Check,
  radio: Radio,
  users: Users,
  smartphone: Smartphone,
  chevron: ChevronDown,
};
export function Icon({
  name,
  className = "",
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  const Component = icons[name];
  return (
    <Component
      className={className}
      size={24}
      strokeWidth={1.6}
      aria-hidden="true"
    />
  );
}
