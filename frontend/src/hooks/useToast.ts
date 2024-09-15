import { toast } from 'sonner';

export const useToast = () => {
    const showToast = (message: string, type = 'default', options = {}) => {
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            case 'info':
                toast.info(message, options);
                break;
            case 'warning':
                toast.warning(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    };

    return { showToast };
};
