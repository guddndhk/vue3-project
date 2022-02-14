import {computed} from 'vue';
import {useStore} from "vuex";

export const useToast = () => {
    //toast
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);
    // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
    // const toastAlertType = computed(() => store.state.toast.toastAlertType);
    // const showToast = computed(() => store.state.toast.showToast);
    // const timeOut = computed(() => store.state.timeOut);

    const triggerToast = (message, type = 'success') => {
        // toastMessage.value = message;
        // toastAlertType.value = type;
        // showToast.value = true;
        // timeOut.value = setTimeout(() => {
        //     toastMessage.value = '';
        //     toastAlertType.value = '';
        //     showToast.value = false;
        // }, 3000);
        store.dispatch('toast/triggerToast', {message, type});
    }

    // onUnmounted(() => {
    //     console.log('unmounted')
    //     clearTimeout(timeOut.value);
    // });

    return {
        triggerToast,
        toasts,
    }
}