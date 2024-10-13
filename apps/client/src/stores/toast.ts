import { defineStore } from "pinia";

import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export const useToastStore = defineStore("toast", () => {
  /** Add a toast to the store */
  function show(title: string, message: string, type = "default" as "default" | "destructive" | "success") {
    toast({
      title: title,
      description: message,
      variant: type ?? "default",
    });
  }

  return {
    show,
  };
});
