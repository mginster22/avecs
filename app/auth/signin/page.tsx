import { cn } from "@/lib/utils";
import { AuthItemsBlock } from "@/shared/components";
import { LoginForm } from "@/shared/forms/login-form";


const LoginPage = () => {
  return (
    <div className={cn("flex flex-col pb-10")}>
      {/* img block */}
      <AuthItemsBlock title="Вхід в систему" img="/assets/login.png">
        <LoginForm />
      </AuthItemsBlock>
    </div>
  );
};

export default LoginPage;
