import { cn } from "@/lib/utils";
import { AuthItemsBlock } from "@/shared/components";
import { RegisterForm } from "@/shared/forms/register-form";



const RegisterPage = () => {
  return (
    <div className={cn("flex flex-col pb-10")}>
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
