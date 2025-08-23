"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { InputCustom } from "@/shared/ui/input-custom";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { NovaPoshtaForm } from "./nova-poshta";
import { useCreateOrder } from "@/shared/hooks/useCreateOrder";
import { ModalSuccess } from "./modal-succes";
import { CartItem } from "@/types/product";
import { Button } from "@/shared/ui/button";
import { useDeleteCart } from "@/shared/hooks/useDeleteCart";

interface Props {
  className?: string;
  data: CartItem[];
}

export const DeliveryCheckoutBlock: React.FC<Props> = ({ data, className }) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState("+380");
  const { deleteCart } = useDeleteCart();
  const [regionInput, setRegionInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [branchInput, setBranchInput] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");
  React.useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
    }
  }, [session]);

  const createOrder = useCreateOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerCreateOrder = () => {
    createOrder.mutate(
      {
        items: data,
        orderData: {
          email,
          phone,
          region: regionInput,
          city: cityInput,
          branch: branchInput,
          payment: paymentMethod,
        },
      },
      {
        onSuccess: (res: any) => {
          if (res.liqpay) {
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://www.liqpay.ua/api/3/checkout";

            const inputData = document.createElement("input");
            inputData.type = "hidden";
            inputData.name = "data";
            inputData.value = res.liqpay.data;
            form.appendChild(inputData);

            const inputSignature = document.createElement("input");
            inputSignature.type = "hidden";
            inputSignature.name = "signature";
            inputSignature.value = res.liqpay.signature;
            form.appendChild(inputSignature);

            document.body.appendChild(form);
            form.submit();
          } else {
            // Если не LiqPay — открываем модалку
            setIsModalOpen(true);
          }
        },
      }
    );
  };
  const isFormValid =
    email.trim() !== "" &&
    phone.trim() !== "" &&
    regionInput.trim() !== "" &&
    cityInput.trim() !== "" &&
    branchInput.trim() !== "";
  return (
    <div className={cn("w-1/2 max-lg:w-full")}>
      <ModalSuccess
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          deleteCart.mutate();
        }}
        items={data}
        email={email}
        phone={phone}
        inputRegion={regionInput}
        inputCity={cityInput}
        inputBranch={branchInput}
      />
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="max-lg:mt-4"
      >
        {/* контактные данные */}
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p>1. Контактнi даннi</p>
          </AccordionTrigger>
          <AccordionContent>
            <form className="flex flex-col gap-2 mt-4 max-lg:mt-0">
              <InputCustom
                type="email"
                isCheckout
                labelName="Email"
                onChange={(value) => setEmail(value)}
                value={email}
                placeholder="Email"
              />
              <InputCustom
                isCheckout
                type="tel"
                labelName="Телефон"
                isPhone
                value={phone}
                onChange={(value) => setPhone(value)}
              />
            </form>
          </AccordionContent>
        </AccordionItem>

        {/* выбор адреса доставки */}
        <AccordionItem
          value="item-2"
          className={cn("flex flex-col gap-4 mt-4 h-auto ")}
        >
          <AccordionTrigger>
            <p>2. Доставка</p>
          </AccordionTrigger>
          <AccordionContent className="h-full">
            <div className="flex items-center gap-2 max-lg:mt-2">
              <img
                src="/assets/novaposhta.svg"
                alt="novaposhta"
                className="w-10 max-lg:w-6"
              />
              <p className="underline max-lg:text-xs">
                Доставка лише у відділення та поштомати Нової Пошти
              </p>
            </div>
            <form className="flex flex-col gap-2 mt-4 ">
              <NovaPoshtaForm
                regionInput={regionInput}
                setRegionInput={setRegionInput}
                cityInput={cityInput}
                setCityInput={setCityInput}
                branchInput={branchInput}
                setBranchInput={setBranchInput}
              />
            </form>
          </AccordionContent>
        </AccordionItem>

        {/* выбор оплаты */}
        <AccordionItem value="item-3" className="mt-4">
          <AccordionTrigger>
            <p>3. Спосіб оплати</p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="cash"
                className="flex items-center gap-2 border-1 border-gray-300 p-2"
              >
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Оплата при доставці</span>
              </label>

              <label
                htmlFor="byDetails"
                className="flex items-center gap-2 border-1 border-gray-300 p-2"
              >
                <input
                  type="radio"
                  id="byDetails"
                  name="payment"
                  value="byDetails"
                  checked={paymentMethod === "byDetails"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Банківський переказ за реквізитами</span>
              </label>

              <label
                htmlFor="liqpay"
                className="flex items-center gap-2 border-1 border-gray-300 p-2"
              >
                <input
                  type="radio"
                  id="liqpay"
                  name="payment"
                  value="liqpay"
                  checked={paymentMethod === "liqpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Оплата через LiqPay (Visa/Master/Privat/ApplePay)</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {isFormValid && (
        <Button variant={"red"} size={"red"} onClick={handlerCreateOrder} className="mt-4">
          Оформити
        </Button>
      )}
    </div>
  );
};
