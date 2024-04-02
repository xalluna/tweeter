import { apiRoutes } from '../routes/index';
import { RoleDto, RoleGetDto } from '../types/roles';
import { apiCall } from './helpers/apiCall';

type UpdateRoleParams = {
  id: number;
  body: RoleDto;
};

export type RolesService = typeof RolesService;

export const RolesService = {
  getAllRoles: async () => {
    return await apiCall<RoleGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.roles.base,
    });
  },

  getRoleById: async (id: number) => {
    return await apiCall<RoleGetDto>({
      method: 'GET',
      endpoint: `${apiRoutes.roles.base}/${id}`,
    });
  },

  createRole: async (body: RoleDto) => {
    return await apiCall<RoleGetDto>({
      method: 'POST',
      endpoint: apiRoutes.roles.base,
      data: body,
    });
  },

  updateRole: async ({ id, body }: UpdateRoleParams) => {
    return await apiCall<RoleGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.roles.base}/${id}`,
      data: body,
    });
  },

  deleteRole: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.roles.base}/${id}`,
    });
  },
};
