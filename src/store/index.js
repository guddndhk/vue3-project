import {createStore} from "vuex";

export default createStore({
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
        timeOut: null
    },
    mutations: {
        UPDATE_TOAST_MESSAGE(state, payload) {
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE(state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS(state, payload) {
            state.showToast = payload;
        }
    },
    actions: {
        triggerToast(context, message, type = 'success') {
            // toastMessage.value = message;
            context.commit('UPDATE_TOAST_MESSAGE', message)
            // toastAlertType.value = type;
            context.commit('UPDATE_TOAST_ALERT_TYPE', type)
            // showToast.value = true;
            context.commit('UPDATE_TOAST_STATUS', true)

            setTimeout(() => {
                // toastMessage.value = '';
                context.commit('UPDATE_TOAST_MESSAGE', '')
                // toastAlertType.value = '';
                context.commit('UPDATE_TOAST_ALERT_TYPE', '')
                // showToast.value = false;
                context.commit('UPDATE_TOAST_STATUS', false)
            }, 3000);

        }
    },
    //computed 와 같은기능
    getters: {
        toastMessageWithSmile (state) {
            return state.toastMessage + '^_^';
        }
    }
});