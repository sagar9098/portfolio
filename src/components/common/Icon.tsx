import {
  Boxes,
  Braces,
  Briefcase,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  LayoutDashboard,
  Layers,
  MonitorSmartphone,
  PanelsTopLeft,
  Plug,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  TestTube,
  Workflow,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '../../types/portfolio';

/** Maps config icon names to Lucide components, keeping portfolio.ts pure data. */
const ICONS: Record<IconName, LucideIcon> = {
  server: Server,
  code: Code,
  smartphone: Smartphone,
  layers: Layers,
  wrench: Wrench,
  database: Database,
  plug: Plug,
  shield: ShieldCheck,
  git: GitBranch,
  test: TestTube,
  rocket: Rocket,
  workflow: Workflow,
  braces: Braces,
  layout: PanelsTopLeft,
  'monitor-smartphone': MonitorSmartphone,
  cloud: Cloud,
  cpu: Cpu,
  dashboard: LayoutDashboard,
  globe: Globe,
  briefcase: Briefcase,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICONS[name] ?? Boxes;
  return <Component aria-hidden="true" {...props} />;
}
