"use client"
import { useRouter } from 'next/navigation';
import { useGlobalState } from "@/hooks/useGlobalState";
import { USER } from "@/utils/constant";

const withProtection = <P extends any>(WrappedComponent: React.ComponentType<P>) => {
  return (props: any) => {
    const [user] = useGlobalState(USER);
    const router = useRouter();
    if(!user) return router.push('/');

    return <WrappedComponent {...props} />;
  };

};

export default withProtection;
