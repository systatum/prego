import React from "react";
import { Fragment, useState } from "react";
import { Dialog } from "@systatum/coneto/dialog";

interface RawRendererProps {
  rawData: unknown;
  parentColor?: string;
}

export const RawRenderer = ({ rawData, parentColor }: RawRendererProps) => {
  return <Dialog></Dialog>;
};
