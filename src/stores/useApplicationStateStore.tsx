import {
  type ApplicationState,
  defaultApplicationState,
} from "@/utilities/applicationState";
import { create } from "zustand";

export interface ApplicationStateStoreState {
  applicationState: ApplicationState;
  setApplicationState: (newApplicationState: ApplicationState) => void;
  resetApplicationState: () => void;
}

const useApplicationStateStore = create<ApplicationStateStoreState>((set) => ({
  applicationState: defaultApplicationState,
  setApplicationState: (newApplicationState: ApplicationState) =>
    set(() => ({ applicationState: newApplicationState })),
  resetApplicationState: () =>
    set(() => ({ applicationState: defaultApplicationState })),
}));

export default useApplicationStateStore;
