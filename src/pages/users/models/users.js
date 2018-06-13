import * as usersService from '../services/users';

export default {
    namespace: 'users',
    state: {
        // list:[{
        //     id: 1,
        //     name: '张三',
        //     email: 'zs@sina.cn',
        //     company: 'wit'
        // }]
        list: [],
        total: null,
        page: null
    },
    reducers: {
        save(state, { payload: { data: list, total, page}}){
            return {...state, list, total, page};
        }
    },
    effects: {
        *fetchUsers({payload : { page = 1 }}, { call, put }){
           
            const { data, headers } = yield call(usersService.fetchUsers, { page })
            yield put({
                type: 'save',
                payload: {
                    data,
                    page: parseInt(page, 10),
                    total: parseInt(headers['x-total-count'], 10)
                }
            });

        },
        *create({ payload: { user }}, { call, put }){
            console.log(user)
        }
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetchUsers', payload: query });
                }
            });
        }
    }
};