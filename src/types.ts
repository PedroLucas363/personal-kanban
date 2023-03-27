import { TABS } from "./enums";

export type Tabs = typeof TABS[keyof typeof TABS];
