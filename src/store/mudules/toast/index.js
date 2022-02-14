export default {
    namespaced: true,
    state: {
        toasts: [],
        // toastMessage: '',
        // toastAlertType: '',
        // showToast: false,
    },
    mutations: {
        // UPDATE_TOAST_MESSAGE(state, payload) {
        //     state.toastMessage = payload;
        // },
        // UPDATE_TOAST_ALERT_TYPE(state, payload) {
        //     state.toastAlertType = payload;
        // },
        // UPDATE_TOAST_STATUS(state, payload) {
        //     state.showToast = payload;
        // },
        ADD_TOAST(state,payload){
            state.toasts.push(payload);
        },
        REMOVE_TOAST(state){
            state.toasts.shift();
        },

    },
    actions: {
        triggerToast({commit}, message, type = 'success') {
            // toastMessage.value = message;
            // context.commit('UPDATE_TOAST_MESSAGE', message)
            // toastAlertType.value = type;
            //context.commit('UPDATE_TOAST_ALERT_TYPE', type)
            // showToast.value = true;
            //context.commit('UPDATE_TOAST_STATUS', true)

            commit('ADD_TOAST',{
                id: Date.now(),
                message: message,
                type: type,
            });

            setTimeout(() => {
                // toastMessage.value = '';
                //context.commit('UPDATE_TOAST_MESSAGE', '')
                // toastAlertType.value = '';
                //context.commit('UPDATE_TOAST_ALERT_TYPE', '')
                // showToast.value = false;
                //context.commit('UPDATE_TOAST_STATUS', false)
                commit('REMOVE_TOAST');
            }, 3000);

        }
    },
    //computed 와 같은기능
    getters: {
        toastMessageWithSmile(state) {
            return state.toastMessage + '^_^';
        }
    },
}
