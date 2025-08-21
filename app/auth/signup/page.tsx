import { RegisterForm } from "@/shared/components/forms/register-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuthItemsBlock } from "@/shared/components";

interface Props {
  className?: string;
}

const RegisterPage: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col pb-10", className)}>
      {/* img block */}
      <AuthItemsBlock
        title="  Відкрийте для себе переваги реєстрації в Avecs"
        img="/register.png"
        isSignUp
      >
        <RegisterForm />
      </AuthItemsBlock>
    </div>
  );
};

export default RegisterPage;
