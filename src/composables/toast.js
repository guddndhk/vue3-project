import {computed} from 'vue';
import {useStore} from "vuex";

export const useToast = () => {
    //toast
    const store = useStore();
    const toastMessage = computed(() => store.getters.toastMessageWithSmile);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);
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
        store.dispatch('triggerToast', message, type);
    }

    // onUnmounted(() => {
    //     console.log('unmounted')
    //     clearTimeout(timeOut.value);
    // });

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
}