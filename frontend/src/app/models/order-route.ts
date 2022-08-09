import { ThemePalette } from '@angular/material/core';

export interface OrderRoute {
  name: string;
  from: {
    name: string;
    address: string;
    contact: string;
  };
  to: {
    name: string;
    address: string;
    contact: string;
  };
  assignee?: {
    id: string;
    name: string;
  };
  routeStatus?: string;
  color: string; //ThemePalette; // '': not start, primary: done, warn: trouble
  note?: string; //for trouble
}
