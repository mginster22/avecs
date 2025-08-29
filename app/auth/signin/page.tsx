"use client";
import { cn } from "@/lib/utils";
import { AuthItemsBlock } from "@/shared/components";
import { LoginForm } from "@/shared/forms/login-form";

import React from "react";

interface Props {
  className?: string;
}

const LoginPage: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col pb-10", className)}>
      {/* img block */}
     <AuthItemsBlock title="Вхід в систему" img="/assets/login.png" >
        <LoginForm />
      </AuthItemsBlock>
    </div>
  );
};

export default LoginPage;
