"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGlobalState } from "@/hooks/useGlobalState";
import { USER } from "@/utils/constant";

const withProtection = <P extends any>(WrappedComponent: React.ComponentType<P>) => {
  return (props: any) => {
    const [user] = useGlobalState(USER);
    const router = useRouter();
    useEffect(() => {
      if(!user) {
        router.push('/')
      }
    }, [user]);

    if(!user) return null;

    return <WrappedComponent {...props} />;
  };

};

export default withProtection;
