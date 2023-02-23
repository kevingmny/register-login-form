import { extendObservable } from 'mobx';

/**
 * UserStore
 */
class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: ''
        })
    }
}
// eslint-disable-next-line
export default new UserStore();