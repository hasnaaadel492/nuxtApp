import { useToast } from "maz-ui";

const notify = (msg: string, status: boolean, autoClose: number) => {
  const toast = useToast(); // Get the toast instance

  toast.open({
    message: msg,
    type: status ? "success" : "error",
    position: "bottom-right",
    duration: autoClose || 3000,
  });
};

export default notify;
