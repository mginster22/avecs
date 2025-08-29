import { cn } from "@/lib/utils";
import { AuthItemsBlock } from "@/shared/components";
import { RegisterForm } from "@/shared/forms/register-form";

interface Props {
  className?: string;
}

const RegisterPage: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col pb-10", className)}>
      {/* img block */}
      <AuthItemsBlock
        title="  Відкрийте для себе переваги реєстрації в Avecs"
        img="/assets/register.png"
        isSignUp
      >
        <RegisterForm />
      </AuthItemsBlock>
    </div>
  );
};

export default RegisterPage;
