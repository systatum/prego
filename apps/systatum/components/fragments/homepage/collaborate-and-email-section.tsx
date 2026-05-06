"use client";

import React, { FormEvent, useState, useMemo, useCallback } from "react";
import { z } from "zod";
import { FormFieldProps, StatefulForm } from "@systatum/coneto/stateful-form";
import { Button } from "@systatum/coneto/button";
import { css } from "styled-components";
import { RiLinkedinBoxFill } from "@remixicon/react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function CollaborateAndEmail() {
  const t = useTranslations("landingPage.collaborateAndEmailSection");
  return (
    <div
      id="email-section"
      className="sm:min-h-screen overflow-hidden px-10 pb-4 pt-20 gap-10 flex flex-col relative w-full h-full bg-[#0d0d0d] text-white justify-between"
    >
      <WaveAnimation />
      <div className="flex md:flex-row flex-col justify-between md:pt-[200px] gap-6">
        <div className="flex md:flex-row flex-col gap-10 w-full">
          <div className="relative md:min-w-[90px] pt-[6px] md:min-h-[90px] md:max-w-[90px] md:max-h-[90px]">
            <img alt="Systatum Logo" src="/systatum/256icon.png" width={200} />
          </div>
          <div
            aria-label="title-and-description"
            className="relative flex flex-col gap-6 md:gap-10 md:max-w-[500px]"
          >
            <h3 className="font-semibold text-3xl sm:text-4xl md:text-5xl">
              {t("title")}
            </h3>
            <span className="text-lg">{t("subtitle")}</span>
          </div>
        </div>
        <FormCollaborateAndEmail />
      </div>
      <Footer />
    </div>
  );
}

function FormCollaborateAndEmail() {
  const t = useTranslations("landingPage.collaborateAndEmailSection");

  const [value, setValue] = useState(EMPTY_FORM);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const collaborateSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(3, t("validationErrorFormName")),
        email: z.string().email(t("validationErrorFormEmail")),
        message: z.string().optional(),
      }),
    [t],
  );

  const textboxProps = {
    styles: {
      labelStyle: css`
        color: white;
      `,
      self: css`
        background-color: transparent;
        color: white;

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          -webkit-text-fill-color: white;
          transition: background-color 9999s ease-in-out 0s;
          box-shadow: 0 0 0px 1000px transparent inset;
          background-color: transparent !important;
        }
      `,
    },
  };

  const EMPLOYEE_FIELDS: FormFieldProps[] = useMemo(
    () => [
      {
        name: "name",
        title: t("labelFormName"),
        type: "text",
        required: true,
        textbox: textboxProps,
      },
      {
        name: "email",
        title: t("labelFormEmail"),
        type: "text",
        required: false,
        textbox: textboxProps,
      },
      {
        name: "message",
        title: t("labelFormMessage"),
        type: "textarea",
        rows: 4,
        required: true,
        textarea: textboxProps,
      },
    ],
    [t],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const res = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (res.ok) {
          toast.success("Email sent successfully!");
          setValue(EMPTY_FORM);
        } else {
          const err = await res.json();
          toast.error(`Failed to send email: ${err.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error(error);
        toast.error("Network error, please try again");
      } finally {
        setIsLoading(false);
      }
    },
    [value],
  );

  return (
    <form
      aria-label="form-collaborate"
      onSubmit={handleSubmit}
      className="flex flex-col text-white gap-3 w-full min-w-[300px]"
    >
      <StatefulForm
        fields={EMPLOYEE_FIELDS}
        formValues={value}
        validationSchema={collaborateSchema}
        onValidityChange={setIsFormValid}
        labelSize="18px"
        mode="onChange"
        onChange={({ currentState }) =>
          setValue((prev) => ({ ...prev, ...currentState }))
        }
      />
      <Button
        isLoading={isLoading}
        disabled={!isFormValid || isLoading}
        type="submit"
        styles={{
          containerStyle: SUBMIT_CONTAINER_STYLE,
          self: SUBMIT_BUTTON_STYLE,
        }}
      >
        Submit
      </Button>
    </form>
  );
}

function Footer() {
  return (
    <div className="flex md:flex-row flex-col relative py-10 md:py-4 gap-4 md:gap-2 w-full items-center">
      <div className="flex text-sm md:text-start text-center font-mono flex-col gap-1 w-full max-w-[140px]">
        <span>Hakuraku Hills</span>
        <span>15-34 Yokohama</span>
        <span>Japan</span>
      </div>
      <span aria-label="divider-horizontal" className="border h-[2px] w-full" />
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 text-sm">
        <a href="mailto:adam@systatum.com" className="font-medium font-mono">
          adam@systatum.com
        </a>
        <a href="https://www.linkedin.com/company/systatum" rel="noreferrer">
          <RiLinkedinBoxFill size={40} />
        </a>
      </div>
    </div>
  );
}

function WaveAnimation() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div
        className="absolute top-0 left-0"
        style={{ transform: "rotate(80deg)" }}
      >
        {WAVE_LAYERS.map((layer, i) => (
          <div key={i} style={layer} />
        ))}
      </div>

      <style jsx>{`
        @keyframes drift {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes anim {
          0% {
            transform: scale(0, 0) rotateZ(-90deg);
            opacity: 0;
          }
          30% {
            transform: scale(1, 1) rotateZ(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1, 1) rotateZ(0deg);
            opacity: 1;
          }
          80% {
            transform: scale(0, 0) rotateZ(90deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const WAVE_BASE: React.CSSProperties = {
  position: "absolute",
  top: "3%",
  left: "10%",
  width: "1500px",
  height: "1300px",
  marginLeft: "-150px",
  marginTop: "-250px",
  transformOrigin: "50% 48%",
  borderRadius: "43%",
};

const WAVE_LAYERS: React.CSSProperties[] = [
  {
    ...WAVE_BASE,
    background: "#4e6fc6",
    opacity: 0.4,
    animation: "drift 7000ms infinite linear",
  },
  {
    ...WAVE_BASE,
    background: "#131313",
    opacity: 0.1,
    animation: "drift 3000ms infinite linear",
  },
  {
    ...WAVE_BASE,
    background: "#2a3d91",
    opacity: 0.4,
    animation: "drift 7500ms infinite linear",
  },
];

const SUBMIT_BUTTON_STYLE = css`
  width: 100%;
  background-image: linear-gradient(90deg, #334aa3, #182042);
  color: white;
  &:hover {
    background-image: linear-gradient(90deg, #3c52a6, #0e1c5a);
  }
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px #0e1c5a,
      0 0 0 5px #3c52a6;
  }
`;

const SUBMIT_CONTAINER_STYLE = css`
  width: 100%;
`;
