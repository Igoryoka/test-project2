import { getUsers } from "/src/services/user.js";

const users = {
    state: {
        // Keys for users table fields
        userKeys: [],
        // Array of user objects
        users: []
    },
    mutations: {
        ADD_USERS: (state, users) => {
            state.users = state.users.concat(users);
        },
        ADD_KEYS_FROM_USERS: (state, users) => {
            users.forEach(user => {
                const keys = Object.keys(user).filter(key => !state.userKeys.includes(key));
                if (!keys.length) return;

                state.userKeys = state.userKeys.concat(keys);
            });
        },
        CHANGE_USER: (state, { id, newUser }) => {
            const user = state.users.find(user => user.id.toString() === id);
            const index = state.users.indexOf(user);
            if (index === -1) return;

            state.users[index] = newUser;
        },
    },
    actions: {
        addUsersAndKeys({ commit }, users) {
            commit("ADD_USERS", users);
            commit("ADD_KEYS_FROM_USERS", users);
        },
        async fetchUsers({ dispatch }, { start, limit }) {
            const data = await getUsers(start, limit);
            dispatch("addUsersAndKeys", data);
            return data;
        }
    }
};

export default users;