import request from '../../../utils/request';
import { pageSize } from '../constants';

export function fetchUsers({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=${pageSize}`);
};