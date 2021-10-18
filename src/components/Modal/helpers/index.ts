import React, { createRef } from "react";

export interface HandleModal {
  show: (component: React.ComponentType, defaultData?: any) => void;
  hidden: () => void;
}

export const refModal = createRef<HandleModal>();

export class Modal {
  static show(component: React.ComponentType, defaultData?: any) {
    refModal.current?.show(component, defaultData);
  }

  static hidden() {
    refModal.current?.hidden();
  }
}
