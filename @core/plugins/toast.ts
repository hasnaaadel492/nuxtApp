const toast = useToast();

const notify = (msg: string, status: boolean, autoClose: number = 3000) => {
  toast[status ? "success" : "error"](msg, {
    position: "bottom-right",
    duration: autoClose,
  });
};

export default notify;
