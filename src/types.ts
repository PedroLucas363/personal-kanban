import { TABS } from "./enums";

export type Tabs = typeof TABS[keyof typeof TABS];

export type Card = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Card[];
};

export type EditCardPayload = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};
