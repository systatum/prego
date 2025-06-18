import { Metadata } from "next";

const BASE_TITLE = "Workaty: Supercharge Your People Operations.";
const BASE_DESCRIPTION =
  "Workaty supercharges your People Operations. Experience how our smart HR operating system streamlines your hiring, management, and workforce development.";

export function createMetadata(title?: string, description?: string): Metadata {
  return {
    title: title ? `${title} | ${BASE_TITLE}` : BASE_TITLE,
    description: description ? description : BASE_DESCRIPTION,
  };
}

export const DEFAULT_METADATA = createMetadata();
export const SIGN_IN_METADATA = createMetadata("Sign In");
export const SIGN_UP_METADATA = createMetadata("Sign Up");
export const DASHBOARD_METADATA = createMetadata("Dashboard");
export const EMPLOYEES_DASHBOARD_METADATA = createMetadata(
  "Employees Dashboard",
);
